package main

import (
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"golang.org/x/crypto/acme/autocert"
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
	// Echo instance
	e := echo.New()
	e.AutoTLSManager.HostPolicy = autocert.HostWhitelist("mfarstad.com")
	e.Pre(middleware.HTTPSWWWRedirect())
	e.AutoTLSManager.Cache = autocert.DirCache("/var/www/.cache")
	e.Use(middleware.Recover())
	e.Use(middleware.Logger())

	// Instantiate a template registry and register all html files inside the view folder
	e.Renderer = &TemplateRegistry{
		templates: template.Must(template.ParseGlob("static/*.html")),
	}

	e.Static("/static", "static")

	// Route => handler
	e.GET("/", func(context echo.Context) error {
		return context.Render(http.StatusOK, "index.html", nil)
	})

	// Start the Echo server
	e.Logger.Fatal(e.StartAutoTLS(":443"))
}
