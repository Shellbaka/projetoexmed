import './AgendarExame.css';

export default function AgendarExame() {
    return (

        <div className='Agendamento'>
            <div className='ExameSangues'>
                <button className='ExameSangue'>Exame de Sangue</button>

                <a href='#ExamedeSangue'>
                    <img src='https://www.valordeplanosdesaude.com.br/wp-content/uploads/2018/10/exame-de-sangue-870x400.jpg' alt='Exame de Sangue'></img>
                </a>

            </div>
            <div className='UrinaFezes'>
                <button className='UrinaFezes1'>Urina e Fezes</button>

                <a href='#UrinaeFezes'>
                    <img src='https://beepsaude.com.br/wp-content/uploads/2021/07/Como-fazer-exame-de-urina-beep-saude.png' alt='Fezes e Urina'></img>
                </a>
            </div>
            <div className='Vacinacao'>
                <button className='Vacinacao1'>Vacinação</button>

                <a href='#Vacinacao'>
                    <img src='https://www.lucasdorioverde.mt.gov.br/arquivos/noticias/11894/p/pref_lrv.jpg' alt='Vacinação'></img>
                </a>
            </div>
        </div>
    );
};
