interface HomeProps {
  language: "pt-br" | "en" | "es";
}

const Home = ({ language }: HomeProps) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <p className="text-2xl font-bold">
        {
          {
            "pt-br": "Início",
            en: "Home",
            es: "Inicio",
          }[language]
        }
      </p>

      <div className="flex flex-col gap-4">
        <p className="text-xl font-bold">
          {
            {
              "pt-br": "Bem-vindo(a) ao",
              en: "Welcome to",
              es: "Bienvenido(a) al",
            }[language]
          }
        </p>

        <p className="text-4xl font-bold">
          {
            {
              "pt-br": "Zinc",
              en: "Zinc",
              es: "Zinc",
            }[language]
          }
        </p>

        <p className="text-xl font-bold">
          {
            {
              "pt-br": "O seu gerenciador de arquivos",
              en: "Your file manager",
              es: "Su gestor de archivos",
            }[language]
          }
        </p>
      </div>
    </div>
  );
};

export default Home;
