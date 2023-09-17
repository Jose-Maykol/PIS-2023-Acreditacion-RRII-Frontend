'use client'

import { AuthService } from "@/api/Auth/authService.js";
import CustomSelect from "@/components/selects/CustomSelect";
import { useUserContext } from "@/hooks/UserContext";
import { semesterOptions, yearOptions } from "@/utils/dataSelect";
import { useEffect, useState } from "react";
import puertaunsa from "../../assets/img/puertaunsa.jpg";
import logoUnsa from "../../assets/img/logo unsa.png";
import { SERVER_PATH } from "../../../config";
import { Selection } from "@nextui-org/react";
import Image from "next/image";

type alertStyle = { display: "none" | "block" }

export function useAlertStyle() {
  return useState<alertStyle>({display: "none"});
}

export default function AuthPage() {
    const paramsGoogle = location.search;

    const [msgError, setMsgError] = useState("");
    const [loginAlert, setLoginAlert] = useAlertStyle();

    const [year, setYear] = useState<Selection>(new Set([yearOptions[0].value]));
    const [semester, setSemester] = useState<Selection>(new Set(["A"]));

    const { setUserAuth } = useUserContext();

    useEffect(
        () => {
            if (paramsGoogle) {

                AuthService.googleLogin(paramsGoogle)
                    .then((response) => {
                        if (response.status) {
                            const data = response.data;

                            const token = data.access_token;
                            const foto = data.image;
                            const user = data.user;
                            const rol = data.role;

                            localStorage.setItem("access_token", token);

                            const userAuth = {
                                access_token: token,
                                userData: {
                                    id: user.id,
                                    name: user.name,
                                    lastname: user.lastname,
                                    rol: rol,
                                },
                                foto: foto,
                            };

                            localStorage.setItem("userAuth", JSON.stringify(userAuth));
                            setUserAuth(userAuth);
                            //history.push("/dashboard");
                        }

                        else {
                            setMsgError(response.data.message);
                            setLoginAlert({ display: "block" });

                            // Retirar el msg de error tras un tiempo
                            setTimeout(() => {
                                setMsgError("");
                                setLoginAlert({ display: "none" });
                            }, 5000);
                        }
                    });
            }
        },
        [],
    );

    return (
        <>
            <div className="mx-auto px-4 h-full min-w-sm">
                <div className="flex content-center items-center justify-center h-full">
                    <div className="flex justify-start w-full sm:w-10/12 lg:w-6/12 px-4 card">
                        <div
                            className="relative flex flex-column min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 card"
                            style={{ borderRadius: "10em !important" }}
                        >

                            <div className="rounded-t mb-0 px-6 py-5" style={{ width: "55%", backgroundColor: "#2793FF" }}>
                                <div className="mb-4 mt-6">
                                    <h1 className="text-white text-3xl font-bold mb-4 text-center" >Bienvenido</h1>
                                    <p className="text-white text-lg font-bold text-center">SISTEMA DE GESTIÓN DE ESTÁNDARES DE ACREDITACIÓN</p>
                                </div>

                                <hr className="mt-6 border-b-1 border-blueGray-300" />

                                <div className="flex flex-col items-center justify-center mb-3 mt-8 filters">
                                    <CustomSelect initValue={year} options={yearOptions}  sm onChange={setYear}/>
                                     <CustomSelect initValue={semester} options={semesterOptions} sm onChange={setSemester}/>
                                </div>

                                <div className="flex justify-center">
                                    <button
                                        className="bg-white hover:bg-blueGray-300 text-blueGray-700 px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => {

                                            const filters = {
                                                YEAR_FILTER: [...year][0],
                                                SEMESTER_FILTER: [...semester][0],
                                            };

                                            // Almacenar la cadena JSON en el localStorage
                                            localStorage.setItem("ACADEMIC_SEMESTER", JSON.stringify(filters));

                                            window.location.href = `${SERVER_PATH}/api/auth/login/google`;
                                        }}
                                    >
                                        <Image
                                            alt="..."
                                            className="w-5 mx-1"
                                            src={logoUnsa}
                                        />
                                        <strong className="mx-2">Accede con tu cuenta institucional</strong>
                                    </button>
                                </div>

                                <div className="text-red-500 font-bold" style={loginAlert}>
                                    Error al iniciar sesión con Google. {msgError}
                                </div>
                            </div>

                            <div className="bg-white" style={{ width: "45%", position: "relative" }}>
                                <Image 
                                  src={puertaunsa} 
                                  alt="puertaunsa" 
                                  className="w-500 h-full absolute top-0 left-0 filter grayscale-98 opacity-25" 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}