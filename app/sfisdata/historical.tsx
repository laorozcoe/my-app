import { View, Text, StyleSheet } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { useState, useEffect } from "react";
import { DataTable } from "react-native-paper";
import { useHistoryContext } from "../lib/HistoriContext";
import { ScrollView } from "react-native";
import { ThemedView } from "@/components/ThemedView";

interface HistoryEntry {
  serialNumber: string;
  modelName: string;
  lineName: string;
  sectionName: string;
  groupName: string;
  stationName: string | null;
  result: string;
  inStationTime: string;
  outStationTime: string;
  inLineTime: string;
}

const HorizontalScreen = () => {
  const { sharedData }: { sharedData: HistoryEntry[] } = useHistoryContext();
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, sharedData.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    };

    lockOrientation();

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ScrollView horizontal>
        <DataTable>
          <DataTable.Header style={styles.header}>
            <DataTable.Title style={styles.title}>serialNumber</DataTable.Title>
            <DataTable.Title style={styles.title}>modelName</DataTable.Title>
            <DataTable.Title style={styles.title}>lineName</DataTable.Title>
            <DataTable.Title style={styles.title}>sectionName</DataTable.Title>
            <DataTable.Title style={styles.title}>groupName</DataTable.Title>
            <DataTable.Title style={styles.title}>stationName</DataTable.Title>
            <DataTable.Title style={styles.title}>result</DataTable.Title>
            <DataTable.Title style={styles.title}>inStationTime</DataTable.Title>
            <DataTable.Title style={styles.title}>outStationTime</DataTable.Title>
            <DataTable.Title style={styles.title}>inLineTime</DataTable.Title>
          </DataTable.Header>

          {sharedData.slice(from, to).map((item: any, index: number) => (
            <DataTable.Row key={index} style={styles.row}>
              <DataTable.Cell style={styles.cell}>{item.serialNumber}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{item.modelName}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{item.lineName}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{item.sectionName}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{item.groupName}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{item.stationName}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{item.result}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{item.inStationTime}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{item.outStationTime}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{item.inLineTime}</DataTable.Cell>
            </DataTable.Row>
          ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(sharedData.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${sharedData.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={"Rows per page"}
          />
        </DataTable>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
  },
  title: {
    fontWeight: "bold",
    textAlign: "center", // Asegurar que los textos estén centrados
    paddingHorizontal: 12, // Espaciado horizontal
  },
  cell: {
    textAlign: "center", // Centrar el texto
    paddingHorizontal: 12, // Espaciado horizontal en las celdas
    fontSize: 14, // Tamaño de fuente
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc", // Línea de separación entre filas
  },
});

export default HorizontalScreen;
