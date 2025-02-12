import { AxiosResponse } from "axios";
function profile_list(response: AxiosResponse) {
    response.status = 200;
    response.data = [
          {name:'jess',displayName:'Jess C', avatar:'/samples/sample.png',description:'Snowy mountain peak under a starry night sky.'},
          {name:'catty',displayName:'Catty', avatar:'/samples/sample2.png',description:'Desert oasis with camels and a vibrant sunset.'},
          {name:'yuki',displayName:'Yuki', avatar:'/samples/sample3.png',description:'Lighthouse on a rocky coast during a storm.'},
          {name:'elle',displayName:'Elle', avatar:'/samples/sample4.jpg',description:'Cherry blossoms by a serene lake in spring.'},
          {name:'jessica',displayName:'Jessica', avatar:'/samples/sample5.jpg',description:'Ancient castle ruins under a full moon.'},
        ]
    return response;
}

export {profile_list};