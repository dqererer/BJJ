import { axios } from '@/utils/request'
import Bus from "@/utils/vueBus";
var tiandituLayer_V,tiandituLayer_I,tiandituLayer_T,tianMarkerLayer,cityNmae;
var mapIdArr=[];
var mapArr=[];
var pointLayerArr=[];
var BorderLayerArr=[];
var BorderUrl = "http://114.255.129.72:8090/iserver/services/map-NM/rest/maps/NMDS";
var pointTpye={"5":"未办理","6":"未办理","2":"未受理",
    "3":"已转办","8":"阶段办结","9":"已办结","7":"未办结"};
var pointStyle= { //未办理 5 6 未受理 2 已转办 3 阶段办结 8 已办结 9 未办结 7
    "2": {
        externalGraphic:require("../assets/images/legend-stat1.png"),
        graphicWidth: 15,
        graphicHeight: 15,
        pointRadius:15
    },
    "3": {
        externalGraphic:require("../assets/images/legend-stat2.png"),
        graphicWidth: 15,
        graphicHeight: 15,
        pointRadius:15
    },
    "5": {
        externalGraphic:require("../assets/images/legend-stat3.png"),
        graphicWidth: 15,
        graphicHeight: 15,
        pointRadius:15
    },
    "6": {
        externalGraphic:require("../assets/images/legend-stat3.png"),
        graphicWidth: 15,
        graphicHeight: 15,
        pointRadius:15
    },
    "7": {
        externalGraphic:require("../assets/images/legend-stat4.png"),
        graphicWidth: 15,
        graphicHeight: 15,
        pointRadius:15
    },
    "8": {
        externalGraphic:require("../assets/images/legend-stat5.png"),
        graphicWidth: 15,
        graphicHeight: 15,
        pointRadius:15
    },
    "9": {
        externalGraphic:require("../assets/images/legend-stat6.png"),
        graphicWidth: 15,
        graphicHeight: 15,
        pointRadius:15
    },

};
var defaultStylePoint={
    fillColor: "red",
    strokeColor: "yellow",
    pointRadius: 7
};
var defaultStyleBorder={
    fillOpacity: 0.2,
    strokeColor: "red",
    strokeWidth: 3
};
var shortObj={};
const baseUrl = process.env.VUE_APP_BASE_API;
var module ={
    initMap:(rel,flag) => {
        mapIdArr=[];
        mapArr=[];
        pointLayerArr=[];
        BorderLayerArr=[];
        if (flag) {
            for (let index in rel) {
                mapIdArr[index] = {
                    id: "map" + rel[index].code,
                    name: rel[index].name,
                    type: rel[index].type,
                    value: rel[index].value
                };
            }
        } else {
            mapIdArr[0] = { id: "map" };
        }

        for (let i in mapIdArr) {
            mapArr[i] = new SuperMap.Map(mapIdArr[i].id, {
                controls: [
                    new SuperMap.Control.Navigation({
                        dragPanOptions: {
                            enableKinetic: true
                        }
                    })
                ],
                allOverlays: true,
                projection: "EPSG:4326"
            });

            //天地图影像
            tiandituLayer_I = new SuperMap.Layer.Tianditu();
            tiandituLayer_I.layerType = "img";
            tiandituLayer_I.visibility = true;
            tiandituLayer_I.url = "http://t${num}.tianditu.com/DataServer?T=${type}_${proj}&x=${x}&y=${y}&l=${z}&tk=92e894ee619fa45bf2395fcbd12d559b";
            //天地图标注
            tianMarkerLayer = new SuperMap.Layer.Tianditu();
            tianMarkerLayer.layerType = "cia";
            tianMarkerLayer.visibility = true;
            tianMarkerLayer.url = "http://t${num}.tianditu.com/DataServer?T=${type}_${proj}&x=${x}&y=${y}&l=${z}&tk=92e894ee619fa45bf2395fcbd12d559b";

            mapArr[i].addLayers([tiandituLayer_I, tianMarkerLayer]);
            BorderLayerArr[i] = new SuperMap.Layer.Vector("BorderLayerArr"+i);
            BorderLayerArr[i].id = "BorderLayerArr"+i;
            BorderLayerArr[i].style = defaultStyleBorder;
            mapArr[i].addLayer(BorderLayerArr[i]);
            pointLayerArr[i] = new SuperMap.Layer.Vector("pointLayer"+i);
            pointLayerArr[i].id = "pointLayer"+i;
            pointLayerArr[i].style = defaultStylePoint;
            mapArr[i].addLayer(pointLayerArr[i]);

            if (flag) {
                module.zoomToExtent(mapIdArr[i].name,BorderLayerArr[i],mapArr[i]);
            }
        }
    },
    destroyMap:() => {
        mapArr.map((val, index, obj) => {
            val.destroy();
        });
    },
    getPointData:(citydata,id,mapArr_bak,pointLayer) => {
        var cityNmae = citydata.name;
        var code = citydata.code;
        axios({
            methon:'get',
            url:baseUrl+'/center/analyse/getMiddleDataPoint',
            params:{'cityCode':code,'batchId':id}
        }).then(rel => {module.addPoint(rel,mapArr_bak,pointLayer)});
        module.zoomToExtent(cityNmae,BorderLayerArr[BorderLayerArr.length-1],mapArr[mapArr.length-1]);
    },
    mapArrBack:() => {
        return mapArr;
    },
    pointLayerBack:() => {
        return pointLayerArr[pointLayerArr.length-1];
    },
    addPointstyle:(val,mapArr_bak,pointLayer) => {
        var pointVec = [];
        val.map((item,index,obj) => {
            var point = new SuperMap.Geometry.Point(parseFloat(item.longitude),parseFloat(item.latitude));
            var vector = new SuperMap.Feature.Vector(point,item,pointStyle[item.handleState]);
            pointVec[index] = vector;
        });
        try{
            pointLayer.addFeatures(pointVec);
            var callbacks = {
                click:module.pointPop
            };
            var selectFeature = new SuperMap.Control.SelectFeature(pointLayer, {
                callbacks: callbacks,
            });
            mapArr_bak[0].addControl(selectFeature);
            selectFeature.activate();
        }catch(err){

        }
    },
    addPoint:(rel,mapArr_bak,pointLayer) => {
        var a = () =>{
            for(let i in rel.data){
                var val = rel.data[i];
                module.addPointstyle(val,mapArr_bak,pointLayer);
            }

        };
        var b = () => {
            for(let i in rel.data){
                var val = rel.data[i];
                module.addPointstyle(val,mapArr_bak,pointLayer);
            }
        };
        if(mapArr_bak.length<2){
            a();
        }else{
            b();
        }
    },
    editPointLayer:(state,flag) => {
        var stateArr = [];
        if(state.length>2){
            stateArr = state.split(",");
        }else{
            stateArr[0] = state;
        }
        stateArr.map((val) => {
            var fliterArr = pointLayerArr[pointLayerArr.length-1].getFeaturesByAttribute("handleState",val+'');
            if(fliterArr.length>0){
                shortObj[val]=fliterArr;
            }
            if(flag & shortObj[val]!=undefined){
                pointLayerArr[pointLayerArr.length-1].addFeatures(shortObj[val]);
            }else{
                pointLayerArr[pointLayerArr.length-1].removeFeatures(fliterArr);
            }
        });
    },
    zoomToExtent:(name,Layer,map) => {

        var queryParam = new SuperMap.REST.FilterParameter({
            name: "内蒙地市@NM",
            attributeFilter: "name='"+name+"'"
        });
        var queryBySQLParams = new SuperMap.REST.QueryBySQLParameters({
            queryParams: [queryParam]
        });
        var queryBySQLService = new SuperMap.REST.QueryBySQLService(BorderUrl, {eventListeners: {
                "processCompleted": (rel) => {
                    var relsult = rel.result.recordsets[0];
                    if(relsult.features.length>0){
                        var feature = relsult.features[0];
                        Layer.addFeatures([feature]);
                        map.zoomToExtent(feature.geometry.getBounds());
                    }
                },
                "processFailed": (err) => {
                }
            }
        });
        queryBySQLService.processAsync(queryBySQLParams);
    },
    pointPop:(fea) =>{
        var id = fea.attributes.id;
        Bus.$emit("middleLetter", id);
    }

};

export {
    module
}
