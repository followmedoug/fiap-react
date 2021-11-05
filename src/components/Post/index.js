import { CardComent, CardPost } from "./styles";
import imgProfile from "../../assets/profile.png"
import { useState } from "react";
import { getUser } from "../../services/security";
import { format } from "date-fns";

function Post({ data }) {

    let signedUser = getUser();

    console.log(data)

    const [showComents, setShowComents] = useState(false);

    const toggleComents = () => setShowComents(!showComents);

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
                        data.Answers.length === 0 ?
                            "Seja o primeiro a comentar" :
                            `${data.Answers.length} Comentário${data.Answers.length > 1 && "s"}`
                    }
                </h3>
                {showComents && (
                    <>
                        <Coment />
                    </>
                )}
                <div>
                    <input placeholder="Comente este post" />
                    <button>Enviar</button>
                </div>
            </footer>
        </CardPost>
    );
}

function Coment() {

    return (
        <CardComent>
            <header>
                <img src={imgProfile} />
                <div>
                    <p>por Ciclano</p>
                    <span>em 10/10/2021 às 13:00</span>
                </div>
            </header>
            <p>Este é o comentário</p>
        </CardComent>
    );
}

export default Post;