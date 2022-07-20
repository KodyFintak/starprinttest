/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import { Text, View, Image, Button, StyleSheet, ScrollView } from "react-native";
import { ImageParameter } from "react-native-star-io10/src/StarXpandCommand/Printer/ImageParameter";
import { InterfaceType, StarConnectionSettings, StarPrinter, StarXpandCommand } from "react-native-star-io10/index";

async function printImage() {
  const uri = Image.resolveAssetSource(require('./sample.png')).uri;
  const imageParameter = new ImageParameter(uri, 580);
  const document = new StarXpandCommand.DocumentBuilder().addPrinter(
    new StarXpandCommand.PrinterBuilder()
      .actionPrintImage(imageParameter)
      .actionCut(StarXpandCommand.Printer.CutType.Partial),
  );

  const builder = new StarXpandCommand.StarXpandCommandBuilder();

  builder.addDocument(document);

  const commands = await builder.getCommands();
  const settings = new StarConnectionSettings();
  settings.interfaceType = InterfaceType.Lan;
  settings.identifier = '1.1.1.1';

  const printer = new StarPrinter(settings);

  await printer.open();
  await printer.print(commands);
}

const App: () => Node = () => {
  return (
    <ScrollView>
      <Button title='print' onPress={printImage} />
      {[...Array(1000).keys()].map(i => {
        return (
          <Image
            key={i}
            style={styles.logo}
            source={{ uri: Image.resolveAssetSource(require('./cat.png')).uri }}
          />
        )
      })}
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  logo: {
    width: 350,
    height: 200,
    resizeMode: 'contain',
  },
});
