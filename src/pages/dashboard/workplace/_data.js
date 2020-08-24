const getNotice = [
    {
        id: 'xxx1',
        title: titles[0],
        num: missionNums[0],
        logo: avatars[0],
        description: '系统或公司会在一定周期内发布新的资源，周期时间视个组进度动态调整。',
        updatedAt: new Date(),
        member: '科学搬砖组',
        href: '',
        memberLink: '',
        addNum: 20,
        missionList: createMissionList('新任务')
    },
    {
        id: 'xxx2',
        title: titles[1],
        num: missionNums[1],
        logo: avatars[1],
        description: '系统会根据跟踪记录中的预约时间提前30分钟对坐席进行提醒',
        updatedAt: new Date('2017-07-24'),
        member: '全组都是吴彦祖',
        href: '',
        memberLink: '',
        missionList: createMissionList('预约任务')
    },
    {
        id: 'xxx3',
        title: titles[2],
        num: missionNums[2],
        logo: avatars[2],
        description: '对意向客户根据不同的销售进度分为无销售进度、开场白等状态，需要坐席重点关注。',
        updatedAt: new Date(),
        member: '中二少女团',
        href: '',
        memberLink: '',
        missionList: createMissionList('跟进中')
    },
    {
        id: 'xxx4',
        title: titles[3],
        num: missionNums[3],
        logo: avatars[3],
        description: '已完成的用户要注意及时跟进催单，使之转化为出单。',
        updatedAt: new Date('2017-07-23'),
        member: '程序员日常',
        href: '',
        memberLink: '',
        missionList: createMissionList('已完成')
    },
    {
        id: 'xxx5',
        title: titles[4],
        num: missionNums[4],
        logo: avatars[4],
        description: '已出单客户在数据有效期内要保持沟通，因为他可能会成为你其它产品的目标客户。',
        updatedAt: new Date('2017-07-23'),
        member: '高逼格设计天团',
        href: '',
        memberLink: '',
        missionList: createMissionList('已出单')
    },
    {
        id: 'xxx6',
        title: titles[5],
        num: null,
        logo: avatars[5],
        description: '对于特定产品可能会有更多不同的状态。',
        updatedAt: new Date('2017-07-23'),
        member: '骗你来学计算机',
        href: '',
        memberLink: '',
        missionList: createMissionList('敬请期待')
    },
];
const getActivities = [
    {
        id: 'trend-1',
        updatedAt: new Date(),
        user: {
            name: '曲丽丽',
            avatar: avatars2[0],
        },
        group: {
            name: '高逼格设计天团',
            link: 'http://github.com/',
        },
        project: {
            name: '六月迭代',
            link: 'http://github.com/',
        },
        template: '在 @{group} 新建项目 @{project}',
    },
    {
        id: 'trend-2',
        updatedAt: new Date(),
        user: {
            name: '付小小',
            avatar: avatars2[1],
        },
        group: {
            name: '高逼格设计天团',
            link: 'http://github.com/',
        },
        project: {
            name: '六月迭代',
            link: 'http://github.com/',
        },
        template: '在 @{group} 新建项目 @{project}',
    },
    {
        id: 'trend-3',
        updatedAt: new Date(),
        user: {
            name: '林东东',
            avatar: avatars2[2],
        },
        group: {
            name: '中二少女团',
            link: 'http://github.com/',
        },
        project: {
            name: '六月迭代',
            link: 'http://github.com/',
        },
        template: '在 @{group} 新建项目 @{project}',
    },
    {
        id: 'trend-4',
        updatedAt: new Date(),
        user: {
            name: '周星星',
            avatar: avatars2[4],
        },
        project: {
            name: '5 月日常迭代',
            link: 'http://github.com/',
        },
        template: '将 @{project} 更新至已发布状态',
    },
    {
        id: 'trend-5',
        updatedAt: new Date(),
        user: {
            name: '朱偏右',
            avatar: avatars2[3],
        },
        project: {
            name: '工程效能',
            link: 'http://github.com/',
        },
        comment: {
            name: '留言',
            link: 'http://github.com/',
        },
        template: '在 @{project} 发布了 @{comment}',
    },
    {
        id: 'trend-6',
        updatedAt: new Date(),
        user: {
            name: '乐哥',
            avatar: avatars2[5],
        },
        group: {
            name: '程序员日常',
            link: 'http://github.com/',
        },
        project: {
            name: '品牌迭代',
            link: 'http://github.com/',
        },
        template: '在 @{group} 新建项目 @{project}',
    },
];
export default {
    currentUser: {
        name: 'Serati Ma',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        userid: '00000001',
        email: 'antdesign@alipay.com',
        signature: '海纳百川，有容乃大',
        title: '交互专家',
        group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
        tags: [
            {
                key: '0',
                label: '很有想法的',
            },
            {
                key: '1',
                label: '专注设计',
            },
            {
                key: '2',
                label: '辣~',
            },
            {
                key: '3',
                label: '大长腿',
            },
            {
                key: '4',
                label: '川妹子',
            },
            {
                key: '5',
                label: '海纳百川',
            },
        ],
        notifyCount: 12,
        unreadCount: 11,
        country: 'China',
        geographic: {
            province: {
                label: '浙江省',
                key: '330000',
            },
            city: {
                label: '杭州市',
                key: '330100',
            },
        },
        address: '西湖区工专路 77 号',
        phone: '0752-268888888',
    },
    notice: getNotice,
    activities:getActivities,
}