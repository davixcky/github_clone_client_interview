package services

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
)

const (
	GithubAccessTokenUrl = "https://github.com/login/oauth/access_token"
	GithubUserUrl        = "https://api.github.com/user"
)

type Github struct {
	clientId     string
	clientSecret string
}

type githubUserData struct {
	Login              string `json:"login"`
	AvatarUrl          string `json:"avatar_url"`
	Name               string `json:"name"`
	Location           string `json:"location"`
	Biography          string `json:"bio"`
	TwitterUsername    string `json:"twitter_username"`
	PublicRepositories int    `json:"public_repos"`
	Followers          int    `json:"followers"`
	Following          int    `json:"following"`
}

func NewGithubClient() *Github {
	ghClient := &Github{}

	ghClient.clientId = getGithubClientID()
	ghClient.clientSecret = getGithubClientSecret()

	return ghClient
}

func (g *Github) getGithubData(accessToken string) githubUserData {
	req, err := http.NewRequest(
		"GET",
		GithubUserUrl,
		nil,
	)
	if err != nil {
		log.Panic("API Request creation failed")
	}

	authorizationHeaderValue := fmt.Sprintf("token %s", accessToken)
	req.Header.Set("Authorization", authorizationHeaderValue)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		log.Panic("Request failed")
	}

	responseBody, _ := io.ReadAll(resp.Body)
	var parsedResponse githubUserData
	json.Unmarshal(responseBody, &parsedResponse)

	return parsedResponse
}

func (g *Github) CallbackHandler(code string) (string, githubUserData) {

	githubAccessToken := g.GetAccessToken(code)
	fmt.Println("Access token: " + githubAccessToken)

	githubData := g.getGithubData(githubAccessToken)
	return githubAccessToken, githubData
}

func (g *Github) GetLoginRedirectUrl() string {
	redirectURL := fmt.Sprintf(
		"https://github.com/login/oauth/authorize?client_id=%s&redirect_uri=%s",
		g.clientId,
		"http://localhost:8080/api/auth/github/login/callback",
	)

	return redirectURL
}

func (g *Github) GetAccessToken(code string) string {
	requestBody := map[string]string{
		"client_id":     g.clientId,
		"client_secret": g.clientSecret,
		"code":          code,
	}

	requestJSON, _ := json.Marshal(requestBody)

	req, err := http.NewRequest("POST", GithubAccessTokenUrl, bytes.NewBuffer(requestJSON))
	if err != nil {
		log.Panicf("Request creation failed: %s", err.Error())
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Accept", "application/json")

	response, err := http.DefaultClient.Do(req)
	if err != nil {
		log.Panicf("Request get failed: %s", err.Error())
	}

	responseBody, _ := io.ReadAll(response.Body)

	type githubAccessTokenResponse struct {
		AccessToken string `json:"access_token"`
		TokenType   string `json:"token_type"`
		Scope       string `json:"scope"`
	}

	var ghParsedResponse githubAccessTokenResponse
	json.Unmarshal(responseBody, &ghParsedResponse)

	return ghParsedResponse.AccessToken
}

func getGithubClientID() string {
	githubClientID, exists := os.LookupEnv("CLIENT_ID")
	if !exists {
		log.Fatal("Github Client ID not defined in .env file")
	}

	return githubClientID
}

func getGithubClientSecret() string {
	githubClientSecret, exists := os.LookupEnv("CLIENT_SECRET")
	if !exists {
		log.Fatal("Github Client ID not defined in .env file")
	}

	return githubClientSecret
}
