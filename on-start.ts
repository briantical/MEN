import jsonfile from 'jsonfile';
import path from 'path';

const addCatalogs = async () => {
  // const count = await Models.find({}).count();
  // if (!count) {
  const file = path.resolve(__dirname, './private/assets', './model.json');
  jsonfile.readFile(file, async (err: any, catalogsJSON: string | any[]) => {
    if (err) throw err;

    for (let index = 0; index < catalogsJSON.length; index++) {
      // const model = new Model(catalogsJSON[index]);
      // await model.save();
    }
  });
  // }
};

const onAppStart = async () => {
  try {
    await addCatalogs();
  } catch (error) {
    console.log('---> on start Error: ');
    console.log(error);
  }
};

export default onAppStart;
