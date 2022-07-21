import { VStack } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

export function Register() {
  return (
    <VStack>
      <Header title="Nova solicitação" />

      <Input 
        placeholder="Número do patrimonio"
        mt={4}
      />

      <Input 
        placeholder="Descrição do problema"
        flex={1}
        mt={5}
        multiline
        textAlignVertical="top"
      />
    </VStack>
  )
}