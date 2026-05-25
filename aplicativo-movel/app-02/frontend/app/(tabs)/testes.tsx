import { Text, View, StyleSheet, TextInput, Pressable, Switch } from "react-native";
import React, { useState } from "react";

export default function Testes() {

    // View 1
    const [liked, setLiked] = useState(0);
    function contarLike() {
        setLiked(liked + 1);
    }
    // View 2
    const [inscreva, setInscreva] = useState(false);
    // View 3
    const [comentario, setComentario] = useState("");

    //view 4
    const [inputComentario, setInputComentario] = useState('joao')
    const [mostrarComentario, setMostrarComentario] = useState('')
    const [visivel, setVisivel] = useState(false)

    function exibirComentario() {
        setVisivel(false)
        setMostrarComentario(inputComentario)
        setInputComentario('')
    }
    function excluirComentario() {
        setMostrarComentario('')
        setVisivel(false)
        setInputComentario('')
    }
    function limparInput () {
        setVisivel(false)
        setInputComentario('')
    }

    return (
        <View style={styles.container}>
            {/* VIEW 1 */}
            <View style={styles.container1}>
                <Pressable
                    style={styles.btn}
                    onPress={contarLike}>
                    <Text>Like</Text>
                </Pressable>
                <Text>{liked}</Text>
            </View>
            {/* VIEW 2 */}
            <View style={styles.container2}>
                <Switch
                    value={inscreva}
                    onValueChange={setInscreva}
                />
                <Text>{inscreva ? "Inscrito" : "Increva-se"}</Text>
            </View>
            {/* VIEW 3 */}
            <View style={styles.container3}>
                <TextInput
                    style={styles.input}
                    value={comentario}
                    onChangeText
                    ={setComentario}
                    placeholder="Insira aqui seu comentário:"
                />

            </View>
            {/* VIEW 4 */}

            <View style={styles.container4} >
                {!visivel ? (
                    <Pressable
                        style={styles.btn1}
                        onPress={() => setVisivel(true)}
                    >
                        <Text>Comentar</Text>
                    </Pressable>
                ) : (
                    // Quando queremos renderizar(aparecer na tela)usamos: 
                    // <></> que Significa que dentro desse espaço entre 'tag' (pacotão)
                    <>
                        <Text>Digite o seu comentário</Text>
                        <TextInput
                            style={styles.input}
                            value={inputComentario}
                            //onChangeText = salvar comentario
                            onChangeText={setInputComentario}
                              placeholder="Insira aqui seu comentário:"
                            autoFocus
                        />

                        <Pressable
                            style={styles.btn1}
                            onPress = {exibirComentario}
                        >
                            <Text>Enviar</Text>
                        </Pressable>
                        <Pressable
                            style = {styles.btn1}
                            onPress = {limparInput}
                            
                        >
                            <Text>Cancelar</Text>
                        </Pressable>
                        {/* botao confirmar */}

                    </>

                )}

                {mostrarComentario !== '' && (
                    <>
                        <Text>{mostrarComentario}</Text>

                        <Pressable
                        style={styles.btn1}
                        onPress={excluirComentario}
                        >
                            <Text>Excluir Comentarios</Text>
                        </Pressable>
                    </>
                )}

            </View>


        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    btn: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    container1: {
        flex: 0.25,
        backgroundColor: ' rgba(0, 136, 233, 0.99)',
        borderWidth: 2,
        borderColor: 'red',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    container2: {
        flex: 0.25,
        backgroundColor: ' rgba(0, 136, 233, 0.99)',
        borderWidth: 2,
        borderColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container3: {
        flex: 0.25,
        backgroundColor: ' rgba(0, 136, 233, 0.99)',
        borderWidth: 2,
        borderColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        padding: 5,
        width: '80%',
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 10,
    },
    container4: {
        flex: 0.25,
        backgroundColor: ' rgba(0, 136, 233, 0.99)',
        borderWidth: 2,
        borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn1: {
        backgroundColor: 'red',
        alignItems: 'center',
        marginBottom: 10,
        height: 30,
        width: 100,
        padding: 7,
    }

})