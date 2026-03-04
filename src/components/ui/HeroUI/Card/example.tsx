import React from 'react';
import Card, { CardHeader, CardBody, CardFooter } from './index';

// Exemplo básico
export const BasicCard = () => {
  return (
    <Card>
      <CardHeader>
        <h4 className="text-xl font-semibold">Meu Card</h4>
        <p className="text-sm text-gray-500">Subtítulo do card</p>
      </CardHeader>
      <CardBody>
        <p>Este é um exemplo básico de card usando HeroUI.</p>
      </CardBody>
      <CardFooter>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Ação
        </button>
      </CardFooter>
    </Card>
  );
};

// Card com imagem
export const CardWithImage = () => {
  return (
    <Card>
      <CardHeader>
        <h4 className="text-xl font-semibold">Card com Imagem</h4>
      </CardHeader>
      <CardBody>
        <img 
          src="https://via.placeholder.com/300x200" 
          alt="Imagem de exemplo"
          className="w-full h-48 object-cover rounded mb-4"
        />
        <p>Este card contém uma imagem e texto descritivo.</p>
      </CardBody>
      <CardFooter>
        <div className="flex gap-2">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Salvar
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded">
            Cancelar
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

// Card com Footer Blur
export const CardWithBlurredFooter = () => {
  return (
    <Card className="h-80">
      <CardBody>
        <div className="h-full flex flex-col justify-center items-center">
          <h4 className="text-xl font-semibold mb-2">Footer com Blur</h4>
          <p className="text-center">
            Este é um exemplo de card com footer blur.
            O efeito é aplicado para destacar o footer do restante do conteúdo.
            Isto é útil quando há conteúdo que pode ser sobreposto pelo footer.
          </p>
        </div>
      </CardBody>
      <CardFooter isBlurred>
        <div className="w-full flex justify-between items-center">
          <p className="text-sm text-gray-500">Última atualização: hoje</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Continuar
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

// Card Pressionável
export const PressableCard = () => {
  const handlePress = () => {
    alert('Card pressionado!');
  };

  return (
    <Card isPressable onPress={handlePress} isHoverable>
      <CardBody>
        <div className="p-4 flex flex-col items-center">
          <div className="rounded-full bg-blue-100 p-4 mb-4">
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">Card Clicável</h3>
          <p className="text-center text-gray-600">
            Este card inteiro é clicável. Clique para executar uma ação.
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

// Card com imagem de capa
export const CoverImageCard = () => {
  return (
    <Card>
      <img 
        src="https://via.placeholder.com/600x300" 
        alt="Imagem de capa"
        className="w-full h-48 object-cover"
      />
      <CardBody>
        <h4 className="text-xl font-semibold mb-2">Card com Imagem de Capa</h4>
        <p>
          Este card possui uma imagem de capa que fica fora do CardBody,
          proporcionando um estilo diferente.
        </p>
      </CardBody>
      <CardFooter>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Explorar
        </button>
      </CardFooter>
    </Card>
  );
};

// Card com estilo personalizado
export const CustomStyledCard = () => {
  return (
    <Card 
      shadow="lg" 
      radius="sm"
      className="border border-purple-200"
    >
      <CardHeader className="bg-purple-50">
        <h4 className="text-xl font-semibold text-purple-700">Card Personalizado</h4>
      </CardHeader>
      <CardBody>
        <p>Este card utiliza estilos personalizados para demonstrar as opções de customização.</p>
        <ul className="list-disc pl-5 mt-2">
          <li>Sombra grande (shadow=&quot;lg&quot;)</li>
          <li>Borda arredondada pequena (radius=&quot;sm&quot;)</li>
          <li>Borda customizada</li>
          <li>Header com cor de fundo</li>
        </ul>
      </CardBody>
      <CardFooter className="bg-purple-50 border-t border-purple-200">
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">
          Confirmar
        </button>
      </CardFooter>
    </Card>
  );
};

// Galeria de exemplos
export const CardExamplesGallery = () => {
  return (
    <div className="p-8 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Exemplos de Cards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BasicCard />
        <CardWithImage />
        <CardWithBlurredFooter />
        <PressableCard />
        <CoverImageCard />
        <CustomStyledCard />
      </div>
    </div>
  );
};

export default CardExamplesGallery; 