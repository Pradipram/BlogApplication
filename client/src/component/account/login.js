import { Box, Button, TextField, Typography, styled } from "@mui/material";
import imageUrl from "../../Images/login.jpg";
import { useContext, useState } from "react";
import { API } from "../../service/api";
import { DataContext } from "../../context/dataProvider";
import { useNavigate } from "react-router-dom";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

// const Image = styled("img")({
//   width : "100%",
//   height : "100%",
//   display: "flex",
//   margin: "auto",
//   padding: "50px 0 0",
// });

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  overflow: auto;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
    color: #fff;
    height: 48px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const signupInitialValues = {
    name: '',
    username: '',
    password: '',
};

const loginInitialValues = {
  username: '',
  password: ''
};

const Login = ({isUserAuthenticated}) => {
    const [account,toggleAccount] = useState('login');
    const [signup,setSignup] = useState(signupInitialValues);
    const [error,setError] = useState("");
    const [login,setLogin] = useState(loginInitialValues);

    const {setAccount} = useContext(DataContext);
    const navigate = useNavigate();

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
        // console.log(signup);
    }

    const signupUser = async () => {
      try {
        // console.log("signupUser ",signup);
        const response = await API.userSignup(signup);
        console.log("signupuser",response);
        if(response.isSuccess){
          setError("");
          setSignup(signupInitialValues);
          toggleAccount('login'); 
        }
        
        // Handle the response here
      } catch (error) {
        console.log("Error:", error);
        // Handle the error here
        setError("something went wrong Please try again later");
      }
    };  
    
    const onValueChange = (e) =>{
      setLogin({...login,[e.target.name] :e.target.value })
    }

    const loginUser = async () => {
      try { 
      let response = await API.userLogin(login);
      if (response.isSuccess) {
          // showError('');

          sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
          sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
          setAccount({ name: response.data.name, username: response.data.username });
          
          isUserAuthenticated(true)
          setLogin(loginInitialValues);
          navigate('/');
      } else {
          // showError('Something went wrong! please try again later');
          setError("something went wrong please try again lator");
      }
      }
      catch(error){
        setError("used does not exist. Click on signUp to register");
      }
  }

  return (
    <Component>
      <Box>
        {/* <Image src={imageUrl} alt="Image not found" /> */}
        <div className="login">
           <h1 className="writeStream">Write Stream</h1>
        </div>
        {
            account === 'login' ?
                <Wrapper>
                    <TextField variant="standard" label = "Enter Username" onChange={(e)=>onValueChange(e)} name="username"/>
                    <TextField variant="standard" label = "Enter Password" onChange={(e)=>onValueChange(e)} name="password"/>

                    {error && <Error>{error}</Error>}
                    <LoginButton variant="contained" onClick={()=>loginUser()}>Login</LoginButton>
                    <Text>OR</Text>
                    <SignupButton onClick={toggleSignup}>Create an account</SignupButton>
                </Wrapper>
                :
                <Wrapper>
                    <TextField variant="standard" label = "Enter Name" name="name" onChange ={(e)=>onInputChange(e)}/>
                    <TextField variant="standard" label = "Enter Username" name="username"
                    onChange={(e)=>onInputChange(e)}/>
                    <TextField variant="standard" label = "Enter Password" name="password" onChange={(e)=>onInputChange(e)}/>

                    {error && <Error>{error}</Error>}
                    <SignupButton onClick={()=>signupUser()}>Sign UP</SignupButton>
                    <Text>OR</Text>
                    <LoginButton onClick={toggleSignup} variant="contained">Already have an account</LoginButton>
                </Wrapper>
        }

      </Box>
    </Component>
  );
};

export default Login;
