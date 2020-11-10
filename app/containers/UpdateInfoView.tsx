import React, {useState, FC, useEffect} from 'react';
import {
  CompositeNavigationProp,
  useFocusEffect,
} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
} from 'react-native';
import {MainTabParamList, RootStackParamList} from '../AppNavigation';
import axios from 'axios';
import {FiliereDoc} from '../services/BaseService';
import {services, getService} from '../services';
import {Filiere} from '../db/Filiere';
import {Info} from '../db/Info';
import realm from '../db';
import LoadingIndicator from '../components/LoadingIndicator';
import {ScrollView} from 'react-native-gesture-handler';
import AboutDev from './Settings/components/AboutDev';

type UpdateInfoScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'UpdateInfoView'>,
  StackNavigationProp<RootStackParamList, 'MainTab'>
>;
type Props = {
  navigation: UpdateInfoScreenNavigationProp;
};

const UpdateInfo: FC<Props> = props => {
  const [docs, setDocs] = useState<FiliereDoc[] | null>(null);
  const [serviceName] = useState(services[0].name);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>('');

  function getCurrentDatabaseVersion() {
    let date = Info.get().database_update;
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let mn = date.getMinutes();
    let format = day + '/' + month + '/' + year+', '+hour+':'+mn;
    return 'Dernière mise à jour : ' + format;
  }
  useEffect(() => {
    setMessage(getCurrentDatabaseVersion());
  }, []);

  async function findAndUpdateDatabase() {
    const fetchData = async () => {
      const docs = await getService(serviceName)!.getAll();
      setDocs(docs);
      try {
        if (docs != null && !isLoading) {
          var index = 0;
          var new_date = Info.get().database_update;
          for (let server_filiere of docs) {
            let local_filiere = Filiere.getById(server_filiere.id);
            let server_date = new Date(server_filiere.updated_at);
            index = index + 1;
            if (local_filiere == null) {
              // create a new one
              Filiere.create(server_filiere);
              if (new_date < server_date) {
                new_date = server_date;
              }
            } else {
              // check timestamp and compare
              let local_date = new Date(local_filiere.updated_at);
              if (local_date < server_date) {
                realm.write(() => {
                  local_filiere!.filiere = server_filiere.filiere;
                  local_filiere!.description = server_filiere.description;
                  local_filiere!.bacc != server_filiere.bacc;
                  local_filiere!.location = server_filiere.location;
                  local_filiere!.updated_at = server_filiere.updated_at;
                  local_filiere!.inscription_open =
                    server_filiere.inscription_open;
                  local_filiere!.inscription_closed =
                    server_filiere.inscription_closed;
                  local_filiere!.fees = server_filiere.fees;
                  local_filiere!.bank_account = server_filiere.bank_account;
                  local_filiere!.bank_account_owner =
                    server_filiere.bank_account_owner;
                  local_filiere!.admission = server_filiere.admission;
                  local_filiere!.document = server_filiere.document;
                  local_filiere!.domaine = server_filiere.domaine;
                });
              }
              if (new_date < server_date) {
                new_date = server_date;
              }
            }
          }
          if (new_date > Info.get().database_update) {
            Alert.alert('Info', 'Mise à jour réussie');
          } else {
            Alert.alert('Info', 'Votre base de données est déjà à jour');
          }
          setIsLoading(false);
          Info.update(new Date(new_date));
          setMessage(getCurrentDatabaseVersion());
        }
      } catch (e) {
        if (e instanceof Error) {
          setIsLoading(false);
          setError(e.message);
        } else {
          throw e;
        }
      }
    };
    setIsLoading(true);
    setError(null);
    await fetchData();
    setIsLoading(false);
  }

  const Separator = ({title}: {title: string}) => (
    <View style={styles.separator}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  return (
    <View style={styles.content}>
      <ScrollView>
      <View>
        <Text style={styles.head}>Info</Text>
      </View>
      <Separator title="A Propos" />
      <View>
        <Text style={styles.text}>
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently
          with desktop publishing software like Aldus PageMaker including
          versions of Lorem Ipsum
        </Text>
      </View>
      <Separator title="Licence" />
      <View>
        <Text style={styles.text}>
          The title and onPress handler are required. It is recommended to set
          accessibilityLabel to help make your app usable by everyone.
        </Text>
      </View>

      <Separator title="Base de données" />
      <View>
        <Text style={styles.text}>{message}</Text>
        <Button
          title="Mettre a jour"
          onPress={() => {
            findAndUpdateDatabase();
          }}
        />
        <LoadingIndicator error={error} loading={isLoading} />
      </View>
      <AboutDev/>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  head: {
    textAlign: 'center',
    fontSize: 30,
    marginVertical: 8,
    fontWeight: 'bold',
  },
  text: {
    textAlign: 'center',
    marginVertical: 8,
  },
  title: {
    fontWeight: 'bold',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    color: 'black',
    fontSize: 25,
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
});

export default UpdateInfo;