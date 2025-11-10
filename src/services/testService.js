export const createTestsFromUserStory = (userStory) => {
  // Aqui vai a lógica "inteligente" (simulação inicial)
  return [
    {
      id: 1,
      type: "Funcional",
      title: "Validar fluxo principal descrito na história",
      steps: [
        "Dado que o usuário acessa o sistema",
        "Quando ele executa a ação principal descrita",
        "Então o resultado deve ser conforme o esperado"
      ]
    },
    {
      id: 2,
      type: "Negativo",
      title: "Garantir tratamento de erros e entradas inválidas",
      steps: [
        "Dado que o usuário envia dados incorretos",
        "Quando o sistema processa a requisição",
        "Então deve exibir uma mensagem de erro adequada"
      ]
    }
  ];
};
