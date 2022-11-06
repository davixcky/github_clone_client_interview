package main

import (
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"hellobuild.co/github-clone/controllers"
	"hellobuild.co/github-clone/middlewares"
	"hellobuild.co/github-clone/models"
	_ "io/ioutil"
	_ "os"
)

func init() {
	godotenv.Load()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "POST,HEAD,PATCH, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func main() {
	r := gin.Default()

	r.Use(CORSMiddleware())
	models.ConnectDatabase()

	auth := r.Group("/api/auth")

	auth.POST("/register", controllers.Register)
	auth.POST("/login", controllers.Login)

	// OAuth for GitHub
	githubOAuth := auth.Group("/github")
	//githubOAuth.Use(cors.Default())
	githubOAuth.GET("/login", controllers.LoginWithGithub)
	githubOAuth.Any("/login/callback", controllers.CallbackGithub)

	protected := r.Group("/api/auth/admin")
	//protected.Use(cors.Default())
	protected.Use(middlewares.JwtAuthMiddleware())
	protected.GET("/user", controllers.CurrentUser)

	r.Run()
}
