package main

import (
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"golang.org/x/crypto/acme/autocert"

	// "golang.org/x/crypto/acme/autocert"
	"html/template"
	"io"
	"net/http"
)

// Define the template registry struct
type TemplateRegistry struct {
	templates *template.Template
}

// Implement e.Renderer interface
func (t *TemplateRegistry) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

func main() {
	debug := false
	// Echo instance
	e := echo.New()
	e.Use(middleware.Gzip())
	if debug {
		e.Pre(middleware.NonWWWRedirect())
	} else {
		e.AutoTLSManager.HostPolicy = autocert.HostWhitelist("mfarstad.com")
		e.Pre(middleware.HTTPSNonWWWRedirect())
	}
	// e.AutoTLSManager.Cache = autocert.DirCache("/var/www/.cache")
	e.Use(middleware.Recover())
	e.Use(middleware.Logger())

	// Instantiate a template registry and register all html files inside the view folder
	e.Renderer = &TemplateRegistry{
		templates: template.Must(template.ParseGlob("static/*.html")),
	}

	e.Static("/static", "static")

	// Route => handler
	e.GET("/", func(context echo.Context) error {
		//context.Response().Header().Add("Content-Encoding", "gzip")
		//context.Response().Header().Add("Vary", "Accept-Encoding")
		return context.Render(http.StatusOK, "index.html", nil)
	})

	// Start the Echo server
	if debug {
		e.Logger.Fatal(e.Start(":8080"))
	} else {
		go func() {
			e.Logger.Fatal(e.Start(":80"))
		}()
		e.Logger.Fatal(e.StartTLS(":443", "/etc/letsencrypt/live/mfarstad.com/cert.pem", "/etc/letsencrypt/live/mfarstad.com/privkey.pem"))
	}
}
