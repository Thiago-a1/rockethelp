import { useState } from "react";
import { Alert } from "react-native";
import { VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";

import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function Register() {
  const [isLoading, setIsLoadind] = useState(false);
  const [patrimony, setPatrimony] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();

  function handleNewOrderRegister() {
    if (!patrimony || !description) {
      return Alert.alert('Registrar', 'Preencha todos os campos.');
    }

    setIsLoadind(true);

    firestore()
      .collection('orders')
      .add({
        patrimony,
        description,
        status: 'open',
        created_at: firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        Alert.alert('Solicitação', 'solicitação registrada com sucesso.');
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
        setIsLoadind(false);
        return Alert.alert('Solicitação', 'Não foi possivel registrar o pedido.');
      })
  }

  return (
    <VStack>
      <Header title="Nova solicitação" />

      <Input 
        placeholder="Número do patrimonio"
        mt={4}
        onChangeText={setPatrimony}
      />

      <Input 
        placeholder="Descrição do problema"
        flex={1}
        mt={5}
        multiline
        textAlignVertical="top"
        onChangeText={setDescription}
      />

      <Button 
        title="Cadastrar"
        mt={5}
        isLoading={isLoading}
        onPress={handleNewOrderRegister}
      />
    </VStack>
  )
}