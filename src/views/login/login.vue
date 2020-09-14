<template>
  <div>
    <div class="TOP-img">
      <img src="../../assets/img/download.png" alt />
    </div>
    <div class="btn">
      <div :class="action ? 'act':''" @click="act">登录</div>
      <div :class="action ? '':'act'" @click="act">注册</div>
    </div>

    <div class="deng" v-if="action">
      <p>账号</p>
      <van-field v-model="usertext" placeholder="请输入用户名" />
      <p>密码</p>
      <van-field v-model="password" type="password" placeholder="请输入密码" />
      <div>
        <input type="checkbox" />记住密码
      </div>
      <p></p>
      <van-button type="primary" block @click="dengLV">登录</van-button>
    </div>

    <div class="zhu" v-else>
      <p>手机号</p>
      <van-field v-model="text" placeholder="请输入手机号" :error="redtext" @blur="taltext" @input="tt" />
      <p>登录名</p>
      <van-field v-model="usertext" type="text" placeholder="请输入登录名" @blur="usertexts" />
      <p>密码</p>
      <van-field v-model="password" type="password" placeholder="请输入密码" />
      <p>短信验证码</p>
      <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
        <template #button>
          <van-button size="small" type="primary" @click="smass">发送验证码</van-button>
        </template>
      </van-field>
      <van-button type="primary" block @click="zhu">注册</van-button>
    </div>
  </div>
</template>

<script>
import qs from "qs"; // 根据需求是否导入qs模块
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      redtext: false,
      action: true,
      usertext: "",
      text: "",
      password: "",
      sms: "",
      msg: "",
      ss: true,
      sss: true,
    };
  },
  methods: {
    ...mapMutations({
      setToken: "setToken",
    }),

    dengLV() {
      
      let params = {
        LoginName: this.usertext,
        LoginPassword: this.password,
        isPassing:"yes"
      };
      // console.log("1111");
      this.$network.loginuse(qs.stringify(params)).then((res) => {
      //  console.log("2222");
        console.log(res.data);
        if(res.data.msg=="登录成功"){
           this.$toast.success("登录成功");
           this.$store.dispatch("Cookivuex",res.data.tnToken.tokenStr)
        setTimeout(() => {
          this.$router.push({ path: "/" });

        }, 1000);
        }else{
          alert("用户名或密码错误")
        }

       
      });
    },

    tt() {
      this.redtext = false;
    },
    usertexts() {
      this.$network
        .username({
          params: {
            LoginName: this.usertext,
          },
        })
        .then((res) => {
          console.log(res);
          let msg = res.data.msg;
          if (msg !== "登录可用") {
            this.$notify({ type: "danger", message: "登录名不可用" });
            this.ss = false;
          }
        });
    },
    taltext() {
      this.$network
        .tabnumber({
          params: {
            phone: this.text,
          },
        })
        .then((res) => {
          console.log(res.data.msg);
          let msg = res.data.msg;
          if (msg == "该手机号已注册") {
            this.$notify({ type: "danger", message: "手机号已注册" });
            this.redtext = true;
            this.sss = false;
          }
        });
    },
    smass() {
      if (this.text !== "" && this.usertext !== "" && this.password !== "") {
        if (this.ss == true && this.sss == true) {
          this.$network
            .sms({
              params: {
                phone: this.text,
                codeType: 0,
              },
            })
            .then((res) => {
              console.log(res.data.msg);
              this.msg = res.data.msg;
            });
        } else {
          alert("信息存在错误，请改正");
          return;
        }
      } else {
        alert("请填写信息在获取验证码");
      }
    },
    zhu() {
      if (
        this.text == "" &&
        this.usertext == "" &&
        this.password == "" &&
        this.sms == ""
      ) {
        this.$toast.fail("请务必填写完整");
        return;
      }
      // if (this.sms == this.msg) {
        let params = {
          LoginName: this.usertext,
          LoginPassword: this.password,
          phone: this.text,
        };
        this.$network.AddLogin(qs.stringify(params)).then((res) => {
          console.log(res.data);
        });
      // } else {
      //   alert("验证码错误");
      // }
    },
    act() {
      this.action = !this.action;
    },
  },
};
</script>

<style scoped lang="scss">
.TOP-img {
  background: white;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  img {
    width: 400px;
    height: 100%;
    margin: 0 auto;
  }
}
.btn {
  width: 100%;
  height: 150px;
  display: flex;
  div {
    flex: 1;
    font-size: 30px;
    text-align: center;
    line-height: 150px;
  }
}
.act {
  background: gainsboro;
  color: cadetblue;
}
.deng {
  width: 100%;

  box-sizing: border-box;
  p {
    font-size: 35px;
    margin-top: 60px;
  }
}
.zhu {
  width: 100%;

  box-sizing: border-box;
  p {
    font-size: 35px;
    margin-top: 60px;
  }
}
</style>