export type RootStackParamList = {
  Index: undefined;
  Cadastrar: undefined;
  records: undefined;
  settings: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
} 