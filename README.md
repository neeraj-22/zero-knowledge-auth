# Zero Knowledge Proof for  Authentication

### MERN app which uses zero knowledge architecture for authentication.

<i>Prover (client) doesn't need to share the information he has (password in this case) to Verifier (server in this case) to verify his identity</i>

<p><i><b>Project Based on paper : </b></i><a href="https://www.researchgate.net/publication/316492793_A_Survey_of_Zero-Knowledge_Proof_for_Authentication">A survey of zero knowledge proof for authentication</a></p>

![Homepage](https://user-images.githubusercontent.com/64327599/168468168-4988c38f-1399-4172-85f6-042117859e5c.png)

<p><i><b>Registering User - </b> A key is generated dynamically by using email and password and is encrypted using <b>SHA-256 algorithm</b></i></p>

![Signup](https://user-images.githubusercontent.com/64327599/168468169-dd347d5a-2e8a-4156-bc5b-7b5ac2f2493b.png)

<p><i><b>Signin Route - </b> SHA-256 algorithm creates same hash for two equal given strings</i></p>

![Signin Success](https://user-images.githubusercontent.com/64327599/168468173-42a1c4b7-4103-4ca9-b689-3edbf548e246.png)

<p><i><b></b>Hence, in case of even a change in capitalisation of a letter would generate a all new hash and thus will throw an error</i></p>

![Signin Fail](https://user-images.githubusercontent.com/64327599/168468179-e3f0ec46-d800-45ef-920b-e6d45729b383.png)

<br/>

## Development

### Prerequisite
1. Make sure you have Node.js version >= 13.

### Install
Clone the repository into your system and open the directory and run this command to install all dependencies
```
npm install
```
### PORT Config (backend)
To customise port of webapp, create <i>.env</i> 
1. Create YOUR_PORT
2. Assign the port value of your choice in YOUR_PORT
3. Access .env parameters in app.js using dotenv.config()
4. Access Port value usign process.env.YOUR_PORT and provide it to app.listen()

### PORT Config (frontend)
To customise port of react-app, open <i>package.json</i> 
1. Find Start  under Scripts object
2. Assign the port value of your choice in set PORT //default port value is 3000

```
"scripts": {
    "start": "set PORT=8000 && react-scripts start"
  }
 ```
3. If you want to proceed with default port then skip above steps and do 
```
"scripts": {
    "start": "react-scripts start"
  }
 ```
### CORS
To access resources available in backend running on different port <i>(while developing in localhost)</i> proceed with either of following 2 steps:

1. Make sure to run command <i><b>npm i cors</b></i> before using in app.js file

```
app.use(cors())
```
2. Go to <i><b>package.json</b></i> of your frontend folder and add the following script :

```
"proxy" : "http://your.ip.address:YOUR_PORT"
```

### Start

Open Project Folder and Frontend directory in command prompt and run following command in both directories
```
npm start
```
