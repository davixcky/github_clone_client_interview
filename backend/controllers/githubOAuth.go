package controllers

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"hellobuild.co/github-clone/services"
	"net/http"
)

var githubClient *services.Github

func init() {
	godotenv.Load()
	githubClient = services.NewGithubClient()
}

func LoginWithGithub(c *gin.Context) {
	redirectUrl := githubClient.GetLoginRedirectUrl()

	c.JSON(http.StatusOK, gin.H{"redirect_url": redirectUrl})
}

func CallbackGithub(c *gin.Context) {
	code := c.Query("code")
	accessToken, userData := githubClient.CallbackHandler(code)
	fmt.Println("UserData: ", userData)
	c.Redirect(http.StatusMovedPermanently, fmt.Sprintf("http://localhost:3000/profile/%s/%s", accessToken, userData.Login))
	//c.JSON(http.StatusOK, gin.H{"user": userData, "access_token": accessToken})
}
