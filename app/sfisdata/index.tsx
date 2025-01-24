import { View, ActivityIndicator, StyleSheet, FlatList, useColorScheme, ScrollView} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text,Button } from 'react-native-paper';
import { ThemedView } from '@/components/ThemedView';

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

interface SfisData {
  serialNumber?: string;
  modelName?: string;
  lineName?: string;
  sectionName?: string;
  groupName?: string;
  stationName?: string;
  result?: string;
  inStationTime?: string;
  outStationTime?: string;
  inLineTime?: string;
  history?: HistoryEntry[];
}

interface ApiResponse {
  type: number;
  data: SfisData;
  message: string | null;
  messages: any[];
  success: boolean;
  fail: boolean;
  warning: boolean;
}

const SfisData = () => {

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const { serial } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true); 
  const [data, setData] = useState<SfisData>({}); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        const raw = JSON.stringify({
          "serialNumber": serial
        });
        
        const requestOptions: RequestInit = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow" as RequestRedirect
        };
        
        debugger
        const response = await fetch(`http://10.58.10.61:9099/api/SfisData/GetSerialHistory`,requestOptions);

        if (!response) {
          throw new Error('Error al obtener datos');
        }

        const result:ApiResponse = await response.json();
        if(result.success){
          setData(result.data);
        }

      } catch (err:any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [serial]);


  const goBack = () =>{
    router.replace('../')
  }

  if (isLoading) {
    // Mostrar indicador de carga
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text variant='headlineSmall'>Searching...</Text>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.errorContainer}>
        <Text variant='headlineLarge' style={styles.errorText}>Error: {error}</Text>
        <Button onPress={goBack} mode='contained'> Go Back</Button>
      </ThemedView>
    );
  }

  if(!data.serialNumber){
    return (
        <ThemedView style={styles.errorContainer}>
          <Text variant='headlineLarge' style={styles.errorText}>Nout found</Text>
          <Text style={styles.textCenter} variant='headlineSmall'>No serial number information could be found:</Text>
          <Text style={[styles.textCenter, { fontWeight: 'bold' }]} variant='headlineSmall'>{serial}</Text>
          <Button onPress={goBack} mode='contained'> Go Back</Button>
        </ThemedView>
      );
  }
  
  const renderHistoryItem = ({ item, index }:{item:HistoryEntry,index:number}) => (
    <ThemedView style={[styles.historyItem, isDarkMode ? styles.darkContainerHistory : styles.lightContainerHistory]}>
      <Text style={[styles.historyHeader,isDarkMode ? styles.darkTextHistory : styles.lightTextHistory]}>History Item {index + 1}</Text>
      <Text style={isDarkMode ? styles.darkTextHistory : styles.lightTextHistory} >Serial Number: {item.serialNumber}</Text>
      <Text style={isDarkMode ? styles.darkTextHistory : styles.lightTextHistory} >Model Name: {item.modelName}</Text>
      <Text style={isDarkMode ? styles.darkTextHistory : styles.lightTextHistory} >Line Name: {item.lineName}</Text>
      <Text style={isDarkMode ? styles.darkTextHistory : styles.lightTextHistory} >Section Name: {item.sectionName}</Text>
      <Text style={isDarkMode ? styles.darkTextHistory : styles.lightTextHistory} >Group Name: {item.groupName}</Text>
      <Text style={isDarkMode ? styles.darkTextHistory : styles.lightTextHistory} >Station Name: {item.stationName ? 'Pass' : 'Fail'}</Text>
      <Text style={isDarkMode ? styles.darkTextHistory : styles.lightTextHistory} >Result: {item.result}</Text>
      <Text style={isDarkMode ? styles.darkTextHistory : styles.lightTextHistory} >In Station Time: {item.inStationTime}</Text>
      <Text style={isDarkMode ? styles.darkTextHistory : styles.lightTextHistory} >Out Station Time: {item.outStationTime}</Text>
      <Text style={isDarkMode ? styles.darkTextHistory : styles.lightTextHistory} >In Line Time: {item.inLineTime}</Text>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>Serial Details</Text>
      <View style={[styles.generalInfo, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
        <Text style={isDarkMode ? styles.darkText : styles.lightText} >Serial Number: </Text>
        <Text variant='bodyLarge' style={[isDarkMode ? styles.darkText : styles.lightText,{fontWeight:'bold'}]} >{data.serialNumber}</Text>
        <Text style={isDarkMode ? styles.darkText : styles.lightText} >Modal Name: </Text>
        <Text variant='bodyLarge' style={[isDarkMode ? styles.darkText : styles.lightText,{fontWeight:'bold'}]} >{data.modelName}</Text>
        <Text style={isDarkMode ? styles.darkText : styles.lightText} >Line Name: </Text>
        <Text variant='bodyLarge' style={[isDarkMode ? styles.darkText : styles.lightText,{fontWeight:'bold'}]} >{data.lineName}</Text>
        <Text style={isDarkMode ? styles.darkText : styles.lightText} >Section Name: </Text>
        <Text variant='bodyLarge' style={[isDarkMode ? styles.darkText : styles.lightText,{fontWeight:'bold'}]} >{data.sectionName}</Text>
        <Text style={isDarkMode ? styles.darkText : styles.lightText} >Group Name: </Text>
        <Text variant='bodyLarge' style={[isDarkMode ? styles.darkText : styles.lightText,{fontWeight:'bold'}]} >{data.groupName}</Text>
        <Text style={isDarkMode ? styles.darkText : styles.lightText} >Station Name:</Text>
        <Text variant='bodyLarge' style={[isDarkMode ? styles.darkText : styles.lightText,{fontWeight:'bold'}]} >{data.stationName? 'Pass' : 'Fail'}</Text>
        <Text style={isDarkMode ? styles.darkText : styles.lightText} >Result: </Text>
        <Text variant='bodyLarge' style={[isDarkMode ? styles.darkText : styles.lightText,{fontWeight:'bold'}]} >{data.result}</Text>
        <Text style={isDarkMode ? styles.darkText : styles.lightText} >In Station Time: </Text>
        <Text variant='bodyLarge' style={[isDarkMode ? styles.darkText : styles.lightText,{fontWeight:'bold'}]} >{data.inStationTime}</Text>
        <Text style={isDarkMode ? styles.darkText : styles.lightText} >Out Station Time: </Text>
        <Text variant='bodyLarge' style={[isDarkMode ? styles.darkText : styles.lightText,{fontWeight:'bold'}]} >{data.outStationTime}</Text>
        <Text style={isDarkMode ? styles.darkText : styles.lightText} >In Line Time: </Text>
        <Text variant='bodyLarge' style={[isDarkMode ? styles.darkText : styles.lightText,{fontWeight:'bold'}]} >{data.inLineTime}</Text>
      </View>
      <Button mode='contained' onPress={() => router.push('/sfisdata/historical')}>History Results</Button>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    gap:5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCenter:{
    textAlign:'center'
  },
  errorText: {
    color: 'red',
    textAlign:'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  serialText: {
    fontSize: 16,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    padding: 5,
  },
  generalInfo: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  historyItem: {
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  historyHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  lightContainer: {
    backgroundColor: 'rgb(25, 118, 210)', // Fondo claro
  },
  darkContainer: {
    backgroundColor: 'rgb(46, 65, 103)', // Fondo oscuro
  },
  lightContainerHistory: {
    backgroundColor: 'rgb(240, 248, 255)', // Fondo claro
  },
  darkContainerHistory: {
    backgroundColor: 'rgb(179, 229, 252)'
  },
  darkText:{color:'rgb(255, 255, 255)'},
  lightText:{color:'rgb(255, 255, 255)'},
  darkTextHistory:{color:'rgb(13, 71, 161)'},
  lightTextHistory:{color:'rgb(13, 71, 161)'}
});

export default SfisData;