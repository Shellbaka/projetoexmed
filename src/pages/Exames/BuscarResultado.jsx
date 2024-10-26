import './BuscarResultado.css';

export default function BuscarResultado() {
    return (

        <div className='BuscarResultado'>


            <form class="CaixaDeBusca">
                <input
                    type="text" class="Procurar" placeholder="Pesquisar...">
                </input>
                <button type="submit" class="BotaoProcura">Buscar</button>
            </form>

            <div className='CaixaSelecaoExame'>
                <p>Selecione o Tipo de Exame</p>
                <select className='ExameTipo'>

                    <option>Exame de Sangue</option>
                    <option>Urina e Fezes</option>
                    <option>Vacinação</option>

                </select>

            </div>



        </div>


    );
};



