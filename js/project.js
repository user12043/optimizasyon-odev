export default {
  find: (id, tasks) => {
    return tasks.find(task => task.id === id);
  },
  clear: project => {
    const { tasks } = project;
    tasks.splice(0, tasks.length);
    project.estimatedTotalCost = 0;
    project.realTotalCost = 0;
    project.possibility = false;
  },
  removeTask: (taskId, tasks) => {
    const removeIndex = tasks.findIndex(({ id }) => id === taskId);
    tasks.splice(removeIndex, 1);
    tasks.forEach(({ tasksBefore, tasksAfter }) => {
      let removeIndex = tasksBefore.findIndex(
        beforeTaskId => beforeTaskId === taskId
      );
      if (removeIndex != -1) {
        tasksBefore.splice(removeIndex, 1);
      }

      removeIndex = tasksAfter.findIndex(afterTaskId => afterTaskId === taskId);
      if (removeIndex != -1) {
        tasksAfter.splice(removeIndex, 1);
      }
    });
  },
  estimatedTotalCost: 30,
  realTotalCost: 28,
  possibility: true,
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
