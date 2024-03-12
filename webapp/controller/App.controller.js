sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  function (BaseController, Filter, FilterOperator) {
    "use strict";

    function onInit() {
     
      var oView = this.getView();
      //var i18nBundle = oView.getModel("i18n").getResourceBundle();

      //oJSONModel.setData(oJSON);
      var oJSONModelEmpl = new sap.ui.model.json.JSONModel();
      oJSONModelEmpl.loadData("../localService/mockdata/Employees.json", false);
      oView.setModel(oJSONModelEmpl, "jsonEmployees");

      var oJSONModelCountries = new sap.ui.model.json.JSONModel();
      oJSONModelCountries.loadData("../localService/mockdata/Countries.json", false);
      oView.setModel(oJSONModelCountries, "jsonCountries");

      var oJSONModelConfig = new sap.ui.model.json.JSONModel({
        visibleID: true,
        visibleName: true,
        visibleCountry: true,
        visibleCity: false,
        visibleBtnShowCity: true,
        visibleBtnHideCity: false
      });
      oView.setModel(oJSONModelConfig, "jsonModelConfig");


      
    }

    function onFilter() {

      var oJSONCountries = this.getView().getModel("jsonCountries").getData();

      var filters = [];

      if (oJSONCountries.EmployeeId !== "") {
        filters.push(new Filter("EmployeeID", FilterOperator.EQ,oJSONCountries.EmployeeId));
      }

      if (oJSONCountries.CountryKey !== "") {
        filters.push(new Filter("Country", FilterOperator.EQ,oJSONCountries.CountryKey));
      }

      var oList = this.getView().byId("tableEmployee");
      var oBinding = oList.getBinding("items");
      oBinding.filter(filters);
    };

    function onClearFilter() {
      var oModel = this.getView().getModel("jsonCountries");
      oModel.setProperty("/EmployeeId", "");
      oModel.setProperty("/CountryKey", "");
    };

    function showPostalCode(oEvent) {
      var itemPressed = oEvent.getSource();
      var oContext = itemPressed.getBindingContext("jsonEmployees");
      var objectContext = oContext.getObject();

      sap.m.MessageToast.show(objectContext.PostalCode);
    };

    function onShowCity() {
      var oJSONModelConfig = this.getView().getModel("jsonModelConfig");
      oJSONModelConfig.setProperty("/visibleCity", true);
      oJSONModelConfig.setProperty("/visibleBtnShowCity", false);
      oJSONModelConfig.setProperty("/visibleBtnHideCity", true);
    };

    function onHideCity() {
      var oJSONModelConfig = this.getView().getModel("jsonModelConfig");
      oJSONModelConfig.setProperty("/visibleCity", false);
      oJSONModelConfig.setProperty("/visibleBtnShowCity", true);
      oJSONModelConfig.setProperty("/visibleBtnHideCity", false);
    };
  

    return BaseController.extend("logaligroup.employees.controller.App", {

      // onValidate: function () {
      //   var inputEmployee = this.byId("inputEmployee");
      //   var valueEmployee = inputEmployee.getValue();

      //   if (valueEmployee.length === 6) {
      //     //inputEmployee.setDescription("OK");
      //     this.byId("labelCountry").setVisible(true);
      //     this.byId("slCountry").setVisible(true);
      //   } else {
      //     //inputEmployee.setDescription("Not OK");
      //     this.byId("labelCountry").setVisible(false);
      //     this.byId("slCountry").setVisible(false);
      //   }
      // },

      

      onInit: onInit,
      onFilter: onFilter,
      onClearFilter: onClearFilter,
      showPostalCode: showPostalCode,
      onShowCity: onShowCity,
      onHideCity: onHideCity


    });
  }
);
