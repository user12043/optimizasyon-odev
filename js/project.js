/* const projectObj = {
  estimatedTotalCost, // Total cost of project (estimated)
  realTotalCost, // Total cost of project (real)
  possibility, // Possibility of completion of project with the estimated cost
  tasks // An array contiains the task objects of project object
};

const taskObj = {
  id, // a unique id to identify task
  description, // A string describes the task's necessity
  tasksBefore, // The ids of tasks have to be done before this task
  cost, // The expected cost of task
  responsible, // The responsible of the task
  color // A color for task
};
 */
export default {
  estimatedTotalCost: 42,
  realTotalCost: 49,
  possibility: false,
  tasks: [
    {
      id: "A",
      description: "Mal seçimi (Kısım mud.)",
      tasksBefore: [],
      cost: 3,
      responsible: "Kısım mud.",
      color: "#67fac3"
    },
    {
      id: "B",
      description: "Mal seçimi (Satın Alma)",
      tasksBefore: [],
      cost: 2,
      responsible: "Satın Alma",
      color: "#84739a"
    },
    {
      id: "C",
      description: "İlan için mal seçimi ve fiyat belirleme",
      tasksBefore: ["A", "B"],
      cost: 2,
      responsible: "Satın Alma",
      color: "ff8400"
    },
    {
      id: "D",
      description: "İlan Hazırlığı (Resim)",
      tasksBefore: ["C"],
      cost: 4,
      responsible: "Tasarım",
      color: "#abfcdd"
    },
    {
      id: "E",
      description: "İlan Hazırlığı (Yazı)",
      tasksBefore: ["C"],
      cost: 3,
      responsible: "Tasarım",
      color: "#000000"
    },
    {
      id: "F",
      description: "İlan Tasarımı",
      tasksBefore: ["D", "E"],
      cost: 2,
      responsible: "Tasarım",
      color: "#ffffff"
    },
    {
      id: "G",
      description: "Posta Listesi Hazırlama",
      tasksBefore: ["C"],
      cost: 3,
      responsible: "Halkla ilişkiler",
      color: "#ab317c"
    },
    {
      id: "H",
      description: "Etiket Basımı",
      tasksBefore: ["G"],
      cost: 1,
      responsible: "Satın Alma",
      color: "#887402"
    },
    {
      id: "I",
      description: "İlan Basımı",
      tasksBefore: ["F"],
      cost: 5,
      responsible: "Satın Alma",
      color: "#13f7ad"
    },
    {
      id: "J",
      description: "Etiket Yapıştırma",
      tasksBefore: ["H", "I"],
      cost: 2,
      responsible: "Satın Alma",
      color: "#849291"
    }
  ]
};
