import { useMutation } from "@apollo/client";
import classNames from "classnames";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { useCreateSubscriberMutation } from "../graphql/generated";


export function Subscribe(){
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [createSubscribe, {loading}] = useCreateSubscriberMutation();

    async function handleSubscribe(event: FormEvent){
        event.preventDefault();

        await createSubscribe({
            variables: {
                name,
                email,
            }
        });
        navigate("/event");
    };

    return(
        <div className="min-h-screen bg-blur bg-cover bg-no-repeat items-center flex flex-col">
            <div className={classNames("w-full max-w-[1100px] flex flex-wrap items-center",{
                "justify-between nx-auto mt-20": window.innerWidth > 700,
                "justify-center gap-8 px-4 mt-20": window.innerWidth < 700
            })}>
                <div className="max-w-[640px]  ">
                    <Logo />
                    <h1 className={classNames("mt-8 text-[2.5rem] leading-tight",{
                        "text-[2.5rem]": window.innerWidth > 700,
                        "text-[1.5rem]": window.innerWidth < 700
                    })}>
                        Construa uma <strong className="text-blue-500">aplicação completa</strong>, do zero, com <strong className="text-blue-500">React</strong>
                    </h1>
                    <p className="mt-4 text-gray-200 leading-relaxed">
                        Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
                    </p>
                </div>
                
                <div className="p-8 bg-gray-700 border border-gray-500 rounded">
                    <strong className="text-2xl mb-6 block">Inscreva-se gratuitamente</strong>
                    <form onSubmit={handleSubscribe} className="flex flex-col gap-2 w-full">
                        <input
                            className="bg-gray-900 rounded px-5 h-14"
                            type="text" 
                            placeholder="Seu nome completo"
                            onChange={event => setName(event.target.value)}
                            // value={name}
                        />
                        <input
                            className="bg-gray-900 rounded px-5 h-14"
                            type="email" 
                            placeholder="Seu melhor email"
                            onChange={event => setEmail(event.target.value)}
                            // value={email}
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                            Garantir minha vaga
                        </button>
                    </form>
                </div>
            </div>
            <img src="/src/assets/group.png" className="mt-10" alt="" />
        </div>
    );
};