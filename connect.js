import { connect } from 'mongoose';
async function connecttoMongoDB() {
    return connect(URL);
}
export default { 
    connecttoMongoDB,

};