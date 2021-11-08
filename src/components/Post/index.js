import { useState, useEffect } from "react";
import { format } from "date-fns";
import styled, {css} from 'styled-components'
import imgProfile from "../../assets/profile.png"
import { getUser } from "../../services/security";
import { api } from '../../services/api'
import { CardComent, CardPost } from "./styles";

const StyledButton = styled.button`
    cursor: pointer;

    ${({ disabled }) => disabled ? css`
        background-color: rgba(237, 20, 91, 0.5);
        cursor: default;
    `: ""}
`

function Post({ data }) {

    let signedUser = getUser();

    const [showComents, setShowComents] = useState(false);
    const [comment, setComment] = useState("")
    const [anwsers, setAnswers] = useState(data.Answers)
    const [disable, setDisable] = useState(false)

    const toggleComents = () => setShowComents(!showComents);

    

    const handleComment = async (event, question) => {
        try {
            event.preventDefault();
            const response = await api.post(`questions/${question?.id}/answers`, {description: comment})

            console.log(response)   
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if(comment.length < 10) {
            setDisable(true)
        } else {
            setDisable(false)
        }
    }, [comment])

    return (
        <CardPost>
            <header>
                <img src={imgProfile} />
                <div>
                    <p>por {signedUser.studentId === data.Student.id ? "você" : data.Student.name}</p>
                    <span>em {format(new Date(data.created_at), "dd/MM/yyyy 'às' HH:mm")}</span>
                </div>
            </header>
            <main>
                <div>
                    <h2>{data.title}</h2>
                    <p>{data.description}</p>
                </div>
                {data.image && <img src={data.image} alt="imagem do post" />}
                <footer>
                    {data.Categories.map(c => <p>{c.description}</p>)}
                </footer>
            </main>
            <footer>
                <h3 onClick={toggleComents}>
                    {
                        anwsers === 0 ?
                            "Seja o primeiro a comentar" :
                            `${anwsers.length} Comentário${anwsers.length > 1 && "s"}`
                    }
                </h3>
                {showComents && (
                    <>
                    {anwsers.map(answer => (
                        <Coment answer={answer} />
                    ))}
                    </>
                )}
                <form onSubmit={event => handleComment(event, data)} >
                    <div>
                        <input placeholder="Comente este post" onChange={event => setComment(event.target.value)} />
                        <StyledButton disabled={disable}>Enviar</StyledButton>
                    </div>
                </form>
            </footer>
        </CardPost>
    );
}

function Coment({ answer, ...props}) {

    return (
        <CardComent {...props}>
            <header>
                <img alt="avatar" src={answer.Student.image} />
                <div>
                    <p>por {answer.Student.name}</p>
                    <span>{answer.Student.created_at}</span>
                </div>
            </header>
            <p>{answer.description}</p>
        </CardComent>
    );
}

export default Post;