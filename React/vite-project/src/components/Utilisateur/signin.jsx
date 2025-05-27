import { useState } from "react"
import image from './../../assets/bg-materiel.jpg'
import { Navigate, useNavigate } from "react-router-dom";
import Validate from "./validate";
import axios from "axios";
import {toast,ToastContainer} from 'react-toastify'
import authService from "../../Service/authService";
export default function Signin() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        userName: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});

    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setErrors(Validate(data));
        if(errors.userName === "" && errors.password === ""){
            console.log(data);
            navigate('/login')
        }
        try{
            await authService.login(data.userName, data.password);
            const user = authService.getCurrentUser();
            switch(user.role) {
                case 'Administrateur':
                  navigate('/Admin');
                  toast.success('Administrateur')
                  break;
                case 'Technicien':
                  navigate('/user');
                  break;
                case 'Enseignant':
                  navigate('/enseignant');
                  break;
                case 'Etudiant':
                    toast.success('Etudiant')
                  //navigate('/etudiant');
                  break;
                case 'ResponsableDep':
                  navigate('/responsable');
                  break;
                default:
                  navigate('/login');
              }
        }
        catch(err){
            console.log(err)
        }
    }
    return(
        <section className="mt-10">
            <ToastContainer />
            <div className="max-w-md mx-auto p-10 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl text-gray-950 font-bold mb-5">Log in</h1>

                <form onSubmit={handleSubmit}>
                    {/*Username*/}
                    <div className="mb-4">
                        <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="userName"
                            value={data.userName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md
                            focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                        {errors.userName && <span className="text-sm text-red-400">{errors.userName}</span>}
                    </div>
                    
                    {/* Password*/}
                    <div className="mb-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md
                                focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                        {errors.password && <span className="text-sm text-red-400">{errors.password}</span>}
                    </div>
                    <div className="mb-6 flex justify-end gap-1 px-1">
                        <input
                            type="checkbox"
                            id="showPassword"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                        />
                        <label htmlFor="showPassword" className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer">{showPassword ? "hide" : "show"}</label>
                    </div>
                    {/*button submit*/}
                    <button
                        type="submit"
                        className="w-full bg-gray-950 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-200 
                        focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                        Connexion
                    </button>

                </form>

            </div>
        </section>
    )
}