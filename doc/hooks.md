## React-hooks

- ### useMemo()

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
  
  - #### how it works

    - `calculatedValue`: useMemo vai **cachear** o valor que a fn vai calcular *(uma variável ou uma função)*. Vai armazenar (cachear) esse valor entre `re-renders`, se atualizar o estado, não vai mudar o `calculatedValue` ele vai persistir entre os re-renders (mudança de estados). Ele vai retornar o mesmo `calculatedValue` se nenhuma das `dependencies` dessa função não mudar desde do último `re-render`, se mudar alguma dependência ele vai **re-calcular** o valor do `calculatedValue` e retornar um novo valor
    - `dependencies`: os valores referenciados em calulatedValue para atualizar ele caso alguma dependência mude. Igual do `useEffect`

  - #### Example To-Do

    - Os `visibleTodos` vão ser aqueles **filtrados** pela fn `filterTodos`, eles vão persistir entre **re-renders** e mudanças de estados. **Só** vão mudar caso `todos` ou `tab` mude de valor