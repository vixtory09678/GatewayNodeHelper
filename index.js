const moment = require('moment')

var APT_DB = require("knex")({
  client: "mssql",
  connection: {
    host: "localhost\\SQLEXPRESS",
    user: "sa",
    password: "asahi1234",
    database: "asahi_production_tracking_db"
  }
});

const getNodeID = async (addr) => {
  const nodeID = await APT_DB('Node').select('NodeID').where('NodeAddress', addr)
  return nodeID[0].NodeID
}

const getGatewayID = async (addr) => {
  const gatewayID = await APT_DB('Gateway').select('GatewayID').where('GatewayAddress', addr)
  return gatewayID[0].GatewayID
}

const addGateway = async (GatewayAddress) => {
  const gateway = {
    GatewayAddress,
    Description: 'Gateway อาคาร 1',
    IPAddress: '192.168.71.201',
    CreatedTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    UpdatedTime: moment().format('YYYY-MM-DD HH:mm:ss')
  }
  await APT_DB('Gateway').insert(gateway);
}

const addNode = async (gatewayID, NodeAddress) => {
  const node = {
    NodeAddress,
    Description: 'กลึงฝา HC',
    GatewayID: gatewayID,
    CreatedTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    UpdatedTime: moment().format('YYYY-MM-DD HH:mm:ss')
  }

  await APT_DB('Node').insert(node)
}

const addWorkCenter = async (nodeID, WorkCenterCode, MachineNumber) => {
  const workcenter = {
    WorkCenterCode,
    MachineNumber,
    ProcessID: 2,
    ProductionID: 1,
    NodeID: nodeID,
    CreatedTime: moment().format('YYYY-MM-DD HH:mm:ss'),
    UpdatedTime: moment().format('YYYY-MM-DD HH:mm:ss')
  }

  await APT_DB('WorkCenter').insert(workcenter)
}

const run = async () => {
  await addGateway('7276FF0045040024')
  await addNode(await getGatewayID('7276FF0045040024'), 5)
  await addWorkCenter(await getNodeID(5),'50130220' ,'1568')
}
run()