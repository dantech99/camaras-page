import Jumbotron from "@/modules/landing/jumbotron";

export default function NosotrosPage() {
  return (
    <>
      <Jumbotron title="NOSOTROS" description="Conoce al equipo detrás de la plataforma que conecta a los mejores fotógrafos de cosplay con las historias que merecen ser contadas." />
      <div className="flex flex-col items-center py-18 max-w-6xl mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">NUESTRA <span className="text-primary-blue">MISION</span> </h1>
        <p className="text-lg text-white/80">
          Somos una empresa dedicada a la fotografía y la captura de momentos
          únicos. Nuestro objetivo es conectar a fotógrafos con personas que
          desean inmortalizar sus recuerdos más preciados.
        </p>
        <p className="text-lg text-white/80">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus iusto cupiditate possimus at facere fugiat, eveniet natus adipisci obcaecati similique atque ullam doloremque quasi. Sequi ipsum quam explicabo rerum deserunt quis! Unde odio ex aspernatur delectus ipsam minus quod error assumenda, cupiditate, ipsa expedita et placeat, asperiores aliquid nulla maiores temporibus corrupti adipisci. Voluptatum architecto non atque, quasi aperiam sint. Maiores eligendi ipsam sed, explicabo dicta cumque. Quia officiis eaque consequuntur et ut reiciendis error soluta quos ipsam facilis? Hic dolor possimus omnis sunt aliquid ea a, voluptates incidunt obcaecati ipsam necessitatibus impedit facere consectetur, laborum sed corporis tempora dolorem?
        </p>
        <p className="text-primary-blue font-bold m-4">
          TAILORED EXPERTS MENTORING
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima alias dicta, fugit consequatur eaque in laudantium ullam repellendus porro, rerum nobis earum quisquam perferendis, maxime et excepturi. Perferendis, sint culpa inventore consectetur eveniet molestias amet id excepturi distinctio magni, voluptas at quae minus nisi dignissimos, accusamus hic quos nam atque!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum incidunt libero soluta quidem ipsam? Natus, dolorum facere est tempora modi sit voluptatem atque libero quisquam, ea asperiores maiores laudantium ipsum.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit quis eaque dignissimos obcaecati fugiat. Ex atque quibusdam vel nostrum consectetur ducimus aut harum voluptatibus ab sunt quod, quae perferendis cumque laborum neque hic ipsa fuga, rerum repellat reprehenderit maiores? Consectetur aut assumenda eveniet fugit perspiciatis cumque culpa, temporibus fuga quasi corrupti cupiditate quibusdam quis soluta nostrum autem, minima nulla sapiente! Corporis dolore commodi aperiam debitis consequatur eligendi voluptatibus, eveniet cupiditate officiis ad dolores. Sit earum atque similique libero dolores ut sunt perferendis itaque cumque aspernatur dolorem assumenda corporis vitae expedita esse quos quam, qui inventore exercitationem ratione, praesentium tempora. Est.
        </p>
        <img src="/images/about-us/team.jpg" alt="Nosotros" className="w-full h-80 object-cover" />
      </div>
    </>
  );
}
