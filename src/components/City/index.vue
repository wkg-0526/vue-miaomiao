<template>
  <div id="main">
    <div class="city_body">
      <div class="city_list">
        <div class="city_hot">
          <h2>热门城市</h2>
          <ul class="clearfix">
            <li
              v-for="item in HotCity"
              :key="item.id"
              @click="sendCityHandle(item.nm,item.id)"
            >{{item.nm}}</li>
          </ul>
        </div>
      </div>
      <van-index-bar :index-list="cityList.index">
        <van-index-anchor :index="item.index" v-for="item in cityList" :key="item.index">
          <span>{{item.index}}</span>
          <van-cell
            :title="v.nm"
            v-for="v in item.list"
            :key="v.id"
            @click="sendCityHandle(v.nm,v.id)"
          />
        </van-index-anchor>
      </van-index-bar>
    </div>
  </div>
</template>

<script>
import TabBar from "@/components/TabBar";
export default {
  name: "City",
  data() {
    return {
      cityList: [],
      HotCity: []
      // isLoading: true
    };
  },
  components: {
    TabBar
  },
  mounted() {
    var cityList = window.localStorage.getItem("cityList");
    var HotCity = window.localStorage.getItem("HotCity");

    if (cityList && HotCity) {
      this.cityList = JSON.parse(cityList);
      this.HotCity = JSON.parse(HotCity);
      this.isLoading = false;
    } else {
      this.axios.get("/api/cityList").then(res => {
        var msg = res.data.msg;
        if (msg === "ok") {
          this.isLoading = false;
          var cities = res.data.data.cities;
          //[ { index : 'A' , list : [{ nm : '阿城' , id : 123 }] } ]
          var { cityList, HotCity } = this.formatCityList(cities);
          this.cityList = cityList;
          this.HotCity = HotCity;
          window.localStorage.setItem("cityList", JSON.stringify(cityList));
          window.localStorage.setItem("HotCity", JSON.stringify(HotCity));
        }
      });
    }
  },
  methods: {
    formatCityList(cities) {
      var cityList = [];
      var HotCity = [];
      // 循环遍历热门城市
      for (var i = 0; i < cities.length; i++) {
        if (cities[i].isHot === 1) {
          HotCity.push(cities[i]);
        }
      }
      // 循环遍历城市列表
      for (var i = 0; i < cities.length; i++) {
        var firstLetter = cities[i].py.substring(0, 1).toUpperCase();
        if (toCom(firstLetter)) {
          //新添加index
          cityList.push({
            index: firstLetter,
            list: [{ nm: cities[i].nm, id: cities[i].id }]
          });
        } else {
          //累加到已有index中
          for (var j = 0; j < cityList.length; j++) {
            if (cityList[j].index === firstLetter) {
              cityList[j].list.push({ nm: cities[i].nm, id: cities[i].id });
            }
          }
        }
      }
      // 对城市列表进行排序
      cityList.sort((n1, n2) => {
        if (n1.index > n2.index) {
          return 1;
        } else if (n1.index < n2.index) {
          return -1;
        } else {
          return 0;
        }
      });
      // 判断firstLetter是否与城市首字母相同
      function toCom(firstLetter) {
        for (var i = 0; i < cityList.length; i++) {
          if (cityList[i].index === firstLetter) {
            return false;
          }
        }
        return true;
      }
      return {
        cityList,
        HotCity
      };
    },
    sendCityHandle(nm, id) {
      this.$store.commit("city/CITY_INFO", { nm, id });
      window.localStorage.setItem("nowNm", nm);
      window.localStorage.setItem("nowId", id);
      this.$router.push("/home/movie/Hot");
    }
    // handleToIndex(index) {
    //   var h2 = this.$refs.city_sort.getElementsByTagName("h2");
    //   this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
    //   this.$refs.city_List.toScrollTop(-h2[index].offsetTop);
    //   console.log(this.$refs.city_List.toScrollTop);
    // },
    // handleToCity(nm, id) {
    //   this.$store.commit("city/CITY_INFO", { nm, id });
    //   window.localStorage.setItem("nowNm", nm);
    //   window.localStorage.setItem("nowId", id);
    //   this.$router.push("/movie/Hot");
    // }
  }
};
</script>

<style scoped>
#content .city_body {
  margin-top: 45px;
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.city_body .city_list {
  flex: 1;
  overflow-y: auto;
  background: #fff;
  margin-bottom: 15px;
}
.city_body .city_list::-webkit-scrollbar {
  background-color: transparent;
  width: 0;
}
.city_body .city_hot {
  margin-top: 20px;
}
.city_body .city_hot h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}

.city_body .city_hot ul li {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
}
.city_body .city_index {
  position: fixed;
  right: 0;
  top: 140px;
  width: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-left: 1px #e6e6e6 solid;
  font-size: 12px;
}
</style>