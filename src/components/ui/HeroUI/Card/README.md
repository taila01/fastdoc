# Card Component

O componente Card é um container versátil para exibir conteúdo relacionado a um único assunto, incluindo texto, fotos e ações.

## Importação

```tsx
import Card, { CardHeader, CardBody, CardFooter } from '@components/ui/HeroUI/Card';
```

## Componentes

O Card é composto por 4 componentes principais:

- **Card**: O componente principal que serve como container.
- **CardHeader**: Comumente usado para o título do card.
- **CardBody**: O conteúdo principal do card.
- **CardFooter**: Geralmente usado para ações.

## Uso Básico

```tsx
<Card>
  <CardHeader>
    <h4 className="text-xl font-semibold">Título do Card</h4>
    <p className="text-sm text-gray-500">Subtítulo</p>
  </CardHeader>
  <CardBody>
    <p>Conteúdo principal do card.</p>
  </CardBody>
  <CardFooter>
    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
      Ação
    </button>
  </CardFooter>
</Card>
```

## Props do Card

| Prop                      | Tipo                                  | Padrão | Descrição                                             |
|---------------------------|---------------------------------------|--------|----------------------------------------------------|
| children                  | ReactNode \| ReactNode[]             |        | Conteúdo do card                                     |
| shadow                    | 'none' \| 'sm' \| 'md' \| 'lg'       | 'md'   | Tamanho da sombra do card                          |
| radius                    | 'none' \| 'sm' \| 'md' \| 'lg'       | 'lg'   | Tamanho do raio das bordas                         |
| fullWidth                 | boolean                               | false  | Se o card deve ocupar toda a largura disponível    |
| isHoverable               | boolean                               | false  | Se o card deve ter efeito ao passar o mouse        |
| isPressable               | boolean                               | false  | Se o card é clicável                               |
| isBlurred                 | boolean                               | false  | Se o card deve ter efeito de blur no fundo         |
| isFooterBlurred           | boolean                               | false  | Se o footer deve ter efeito de blur                |
| isDisabled                | boolean                               | false  | Se o card está desabilitado                        |
| disableAnimation          | boolean                               | false  | Se as animações devem ser desativadas              |
| allowTextSelectionOnPress | boolean                               | false  | Permite seleção de texto em cards clicáveis        |
| classNames                | { base?, header?, body?, footer? }    |        | Classes CSS personalizadas para cada componente    |

## Eventos do Card

| Prop          | Tipo                           | Descrição                                    |
|---------------|--------------------------------|---------------------------------------------|
| onPress       | (e: PressEvent) => void        | Chamado quando o card é clicado              |
| onPressStart  | (e: PressEvent) => void        | Chamado quando o clique inicia               |
| onPressEnd    | (e: PressEvent) => void        | Chamado quando o clique termina              |
| onPressChange | (isPressed: boolean) => void   | Chamado quando o estado de clique muda       |
| onPressUp     | (e: PressEvent) => void        | Chamado quando o botão do mouse é solto      |

## Variações

### Card com Imagem

```tsx
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
    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
      Salvar
    </button>
  </CardFooter>
</Card>
```

### Card com Footer Blur

```tsx
<Card className="h-80">
  <CardBody>
    <div className="h-full flex flex-col justify-center items-center">
      <h4 className="text-xl font-semibold mb-2">Footer com Blur</h4>
      <p className="text-center">
        Este card possui um footer com efeito de blur.
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
```

### Card Clicável

```tsx
<Card isPressable onPress={handlePress} isHoverable>
  <CardBody>
    <div className="p-4 flex flex-col items-center">
      <h3 className="text-lg font-medium mb-2">Card Clicável</h3>
      <p className="text-center text-gray-600">
        Este card inteiro é clicável.
      </p>
    </div>
  </CardBody>
</Card>
```

## Atributos de Dados

O componente Card tem os seguintes atributos de dados no elemento base:

- **data-hover**: Quando o mouse está sobre o card
- **data-focus**: Quando o card está em foco
- **data-focus-visible**: Quando o card está em foco via teclado
- **data-disabled**: Quando o card está desabilitado
- **data-pressed**: Quando o card está sendo pressionado

Para mais exemplos, veja o arquivo `example.tsx`. 