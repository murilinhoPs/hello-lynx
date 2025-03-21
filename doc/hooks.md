# React

- ## Links
  - [useRef and useMemo examples](https://dev.to/bhavzlearn/demystifying-useref-and-usememo-in-react-4jcl)
  - [useRef, useMemo, useCallback](https://dev.to/michael_osas/understanding-react-hooks-how-to-use-useref-usememo-and-usecallback-for-more-efficient-code-3ceh)

- ## Update state (re-render)

  Toda vez que atualizamos o estado (ou algum re-render) o React roda novamente a função (o componente) e recria novamente todas as funcões e variáveis dentro dela (se não tem nenhum hook como useMemo, useRef.... sendo usado)

  - ### referencial equality in JS

    No `JS` ao comparar duas variáveis ele compara a `ref` deles, e não os `valores` diretamente:
    $~~~~~~~$

    ```js
    const themeStyles = { backgroundColor: dark? 'black' : 'white', color: dark? 'white' : 'black' }

    const themeStyles2 = { backgroundColor: dark? 'black' : 'white', color: dark? 'white' : 'black' }
    ```

    Ao comparar esses dois objetos, por mais que eles tenham oo mesmo valor, o JS entende que eles são diferentes pq sua `Ref` é diferente um do outro.

- ## useRef()

  ```js
  import { useRef } from 'react';
  export default function Counter() {
    let ref = useRef(0);
    function handleClick() {
      ref.current = ref.current + 1;
      alert('You clicked ' + ref.current + ' times!');
    }
    return (
      <button onClick={handleClick}>
        Click me!
      </button>
    );
  } 
  ```

  - Não está atualizando a UI, é basicamente um `useState` que persiste seu estado entre os re-renders com a mesma **Ref** mas **não atualiza a UI**, só lógica
  - Creates a mutable reference to an element or a value that persists across renders, allowing for direct access and modification without re-rendering the component. Cria um plain JS object `myRef: { current: null }`, que não é re-criado a cada re-render, persistindo o seu valor entre os renders

  - ### Example referencing an input
  
  ```js
  function focusOnInput() {
    const inputToFocus = useRef(null);
    const clickHandler = () => {
      inputToFocus.current.focus();
    };
    return (
      <>
        <input ref={inputToFocus} type="text" />
        <button onClick={clickHandler}>Focus on Input</button>
      </>
    );
  }
  ```

  - Está referenciando o `input`, então qualquer chamada ou alteração do `inputToFocus.current` vai alterar alguma propriedade nativa do `input`

- ### Example previous counter

  ```js
  export default function App() {
    const prevValue = useRef(0);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
      console.log("counter:", counter, "prevValue:", prevValue);
    }, [prevValue, counter]);

    return (
      <div className="App">
        <p>{counter}</p>
        <button
          onClick={() => {
            setCounter((counter) => {
              prevValue.current = counter;
              return counter + 1;
            });
          }}
        >
          Increase by 1
        </button>
      </div>
    );
  }
  ```

  - Está salvando o counter para exibir na UI quantas vezes foi clicado, mas também está salvando localmente o prevValue. Pode ser útil para fazer alguma lógica envolvendo o valor anterior ou precise desse valor para outra coisa

- ## useMemo()

  ``` js
  import { useMemo } from 'react';

  function TodoList({ todos, tab }) {
    const visibleTodos = useMemo(
      () => filterTodos(todos, tab),
      [todos, tab]
    );
  }
  ```

  - **useMemo** props: `useMemo(calculateValue, dependencies)`
  - Memoization is a concept where we store the calculated value of an expensive function into the cache.
  
  - ### how it works

    - `calculatedValue`: useMemo vai **cachear** o valor que a fn vai calcular *(uma variável ou uma função)*. Vai armazenar (cachear) esse valor entre `re-renders`, se atualizar o estado, não vai mudar o `calculatedValue` ele vai persistir entre os re-renders (mudança de estados). Ele vai retornar o mesmo `calculatedValue` se nenhuma das `dependencies` dessa função não mudar desde do último `re-render`, se mudar alguma dependência ele vai **re-calcular** o valor do `calculatedValue` e retornar um novo valor
    - `dependencies`: os valores referenciados em calulatedValue para atualizar ele caso alguma dependência mude. Igual do `useEffect`

  - ### Example To-Do

    - Os `visibleTodos` vão ser aqueles **filtrados** pela fn `filterTodos`, eles vão persistir entre **re-renders** e mudanças de estados. **Só** vão mudar caso `todos` ou `tab` mude de valor. É uma função que requer um *processamento maior*, principalmente em arrays grandes que vc só quer que o React `re-crie/re-render` essa função se **APENAS** suas dependencies mudarem. Isso seria uma otmização de performance

  - ### Example 2, themeStyles

    ```js
    const themeStyles = { backgroundColor: dark? 'black' : 'white', color: dark? 'white' : 'black' }

    useEffect(() -> {
      console.log('Theme changed')
    }, 
    [themeStyles])
    ```

    Dessa forma, sem usar o useMemo, toda vez que o componente for re-criado ele vai disparar o log do `'Theme Changed'` pq o React vai re-criar o objeto `themeStyles` então ele vai ter uma **Ref** diferente do themeStyles antes do re-render, mesmo eles tendo os mesmo valores.

    Se quiser que só rode o useEffec REALMENTE quando só mudar o valor do themeStyles, usar o useMemo para cachear esse objeto sendo assim ele teria a mesma Ref.
    OBS: useMemo instead of useRef, nesse caso ele muda de valor quando dark é alterado e NÃO vou alterar esse objeto diretamente então faz sentido o useMemo para atualizar certinho o objeto de acordo com suas dependencies

   ```js
    const themeStyles = useMemo(() => { 
      backgroundColor: dark? 'black' : 'white', color: dark? 'white' : 'black' 
      }, [dark])

    useEffect(() -> {
      console.log('Theme changed') // will print only if the value of themeStyles is updated
    },
    [themeStyles])
    ```
