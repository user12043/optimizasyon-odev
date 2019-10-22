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
  tasksAfter, // The ids of tasks have to be done after this task
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
      tasksAfter: ["C"],
      cost: 3,
      responsible: "Kısım mud.",
      color: "#67fac3"
    },
    {
      id: "B",
      description: "Mal seçimi (Satın Alma)",
      tasksBefore: [],
      tasksAfter: ["C"],
      cost: 2,
      responsible: "Satın Alma",
      color: "#84739a"
    },
    {
      id: "C",
      description: "İlan için mal seçimi ve fiyat belirleme",
      tasksBefore: ["A", "B"],
      tasksAfter: ["D", "E", "G"],
      cost: 2,
      responsible: "Satın Alma",
      color: "ff8400"
    },
    {
      id: "D",
      description: "İlan Hazırlığı (Resim)",
      tasksBefore: ["C"],
      tasksAfter: ["F"],
      cost: 4,
      responsible: "Tasarım",
      color: "#abfcdd"
    },
    {
      id: "E",
      description: "İlan Hazırlığı (Yazı)",
      tasksBefore: ["C"],
      tasksAfter: ["F"],
      cost: 3,
      responsible: "Tasarım",
      color: "#000000"
    },
    {
      id: "F",
      description: "İlan Tasarımı",
      tasksBefore: ["D", "E"],
      tasksAfter: ["I"],
      cost: 2,
      responsible: "Tasarım",
      color: "#ffffff"
    },
    {
      id: "G",
      description: "Posta Listesi Hazırlama",
      tasksBefore: ["C"],
      tasksAfter: ["H"],
      cost: 3,
      responsible: "Halkla ilişkiler",
      color: "#ab317c"
    },
    {
      id: "H",
      description: "Etiket Basımı",
      tasksBefore: ["G"],
      tasksAfter: ["J"],
      cost: 1,
      responsible: "Satın Alma",
      color: "#887402"
    },
    {
      id: "I",
      description: "İlan Basımı",
      tasksBefore: ["F"],
      tasksAfter: ["J"],
      cost: 5,
      responsible: "Satın Alma",
      color: "#13f7ad"
    },
    {
      id: "J",
      description: "Etiket Yapıştırma",
      tasksBefore: ["H", "I"],
      tasksAfter: ["K"],
      cost: 2,
      responsible: "Satın Alma",
      color: "#849291"
    },
    {
      id: "K",
      description: "İlan Postalama",
      tasksBefore: ["J"],
      tasksAfter: [],
      cost: 10,
      responsible: "Muhaberat",
      color: "#145f5a"
    }
  ]
};
