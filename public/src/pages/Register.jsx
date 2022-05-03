import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';

function Register() {
	const navigate = useNavigate();

	const toastOptions = {
		position: 'bottom-right',
		autoClose: 8000,
		pauseOnHover: true,
		draggable: true,
		theme: 'dark',
	};

	const [values, setValues] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	useEffect(() => {
		if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
			navigate('/');
		}
	}, []);

	const handleChange = (event) => {
		setValues({ ...values, [event.target.name]: event.target.value });
	};

	const handleValidation = () => {
		const { password, confirmPassword, username, email } = values;
		if (password !== confirmPassword) {
			toast.error('Senha não coincide com a digitada!', toastOptions);
			return false;
		} else if (username.length < 3) {
			toast.error('Usuário deve conter no mínimo 3 caracteres!', toastOptions);
			return false;
		} else if (password.length < 8) {
			toast.error('Senha deve conter no mínimo 8 caracteres!', toastOptions);
			return false;
		} else if (email === '') {
			toast.error('Email é obrigatório', toastOptions);
			return false;
		}

		return true;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (handleValidation()) {
			const { email, username, password } = values;
			const { data } = await axios.post(registerRoute, {
				username,
				email,
				password,
			});

			if (data.status === false) {
				toast.error(data.msg, toastOptions);
			}
			if (data.status === true) {
				localStorage.setItem(
					process.env.REACT_APP_LOCALHOST_KEY,
					JSON.stringify(data.user)
				);
				navigate('/');
			}
		}
	};

	return (
		<>
			<FormContainer>
				<form action='' onSubmit={(event) => handleSubmit(event)}>
					<div className='brand'>
						<img src={Logo} alt='logo' />
						<h1>Bate Papo Wow!</h1>
					</div>
					<input
						type='text'
						placeholder='Usuário'
						name='username'
						onChange={(e) => handleChange(e)}
					/>
					<input
						type='email'
						placeholder='Email'
						name='email'
						onChange={(e) => handleChange(e)}
					/>
					<input
						type='password'
						placeholder='Senha'
						name='password'
						onChange={(e) => handleChange(e)}
					/>
					<input
						type='password'
						placeholder='Confirme Senha'
						name='confirmPassword'
						onChange={(e) => handleChange(e)}
					/>
					<button type='submit'>Create User</button>
					<span>
						Already have an account ? <Link to='/login'>Login.</Link>
					</span>
				</form>
				<footer />
			</FormContainer>
			<ToastContainer />
		</>
	);
}

const FormContainer = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	// gap: 100rem;
	align-items: center;
	background-color: #fcde67;
	// background-color: #131324;
	footer {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: auto;
		width: 100vw;
		padding-top: 90px;
		color: #fff;
		background-color: #5bccf6;
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 1rem;
		justify-content: center;
		img {
			height: 5rem;
		}
		h1 {
			color: white;
			text-transform: uppercase;
		}
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		background-color: #030e12bd;
		// background-color: #00000076;
		border-radius: 2rem;
		padding: 3rem 5rem;
	}

	input {
		background-color: transparent;
		padding: 1rem;
		border: 0.1rem solid #5bccf6;
		border-radius: 0.4rem;
		color: white;
		width: 100%;
		font-size: 1rem;
		&:focus {
			border: 0.1rem solid #997af0;
			outline: none;
		}
		::placeholder {
			/* Chrome, Firefox, Opera, Safari 10.1+ */
			color: white;
			opacity: 0.5; /* Firefox */
		}
	}

	button {
		background-color: #5bccf6;
		color: white;

		padding: 1rem 2rem;
		border: none;
		font-weight: bold;
		cursor: pointer;
		border-radius: 0.4rem;
		font-size: 1rem;
		text-transform: uppercase;
		&:hover {
			background-color: #5bccf6;
		}
	}

	span {
		color: white;

		text-transform: uppercase;
		a {
			color: #5bccf6;
			text-decoration: none;
			font-weight: bold;
		}
	}
`;

export default Register;
