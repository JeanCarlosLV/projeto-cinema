import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import './filme-info.css'
import api from '../../services/api'

import { toast } from "react-toastify";

function Filme(){
    const {id} = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        async function loadFilme(){
            await api.get(`/movie/${id}`,{
                params: {
                    api_key: "4511172906e4f70a0dd6f160bd4697e2",
                    language: "pt-BR", 
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })

            .catch(()=>{
                console.log("Filme não encontrado")
                //Faz e garante a volta para a tela inicial caso não encontre o filme
                navigate("/", {replace:true})
                return;
            })
        }

        loadFilme();

        return() =>{
            console.log("Componente foi desmontado")
        }
        //adicionados como dependências, por serem externos ao useEffect
    }, [navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix")

        let filmesSalvos= JSON.parse(minhaLista)  || []; 

        const hasFilme = filmesSalvos.some((filmeSalvo)=> filmeSalvo.id === filme.id)
    
        if(hasFilme){
            toast.warn("Esse filme já está na sua lsita!");
            return;
        }
        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
        toast.success("Filme salvo com sucesso!");
    }

    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}></img>
            
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average}/10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>

    )
}

export default Filme;