import React, { useState, useEffect } from "react";
import {
  Layout, Menu, Button, Typography, Space, Drawer, Switch, Segmented,
  ConfigProvider, theme, ColorPicker, Slider, Select, Divider, Table, 
  Tag, Row, Col, Empty, Tooltip, Card, Breadcrumb, Modal,
  Collapse, Upload, message, Carousel, Rate, Progress
} from "antd";

import {
  DashboardOutlined, PictureOutlined, UserOutlined, SettingOutlined, 
  MenuFoldOutlined, MenuUnfoldOutlined, PlusOutlined, DeleteOutlined,
  BgColorsOutlined, FontSizeOutlined, LayoutOutlined, 
  ReloadOutlined, BorderOutlined, TableOutlined, UploadOutlined,
  BulbOutlined, BulbFilled, CameraOutlined, ArrowsAltOutlined,
  FileImageOutlined, CloseCircleFilled, AppstoreOutlined,
  ThunderboltOutlined, RocketOutlined, FolderOutlined, FolderOpenOutlined,
  ArrowLeftOutlined, BarsOutlined, LeftOutlined, RightOutlined, UserOutlined as ProfileIcon
} from "@ant-design/icons";

import { 
  PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid 
} from 'recharts';
import { Sector } from "recharts";


const { Sider, Header, Content, Footer } = Layout;
const { Title, Text } = Typography;
const { Panel } = Collapse;
const { Meta } = Card;

const PRESET_BGS = [
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200",
  "https://images.unsplash.com/photo-1520390138845-fd2d229dd553?q=80&w=1200",
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200",
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200",
  "https://images.unsplash.com/photo-1500673922987-e212871fec22?q=80&w=1200",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200",
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200",
];

const TABLE_TEXTURES = [
  "https://www.transparenttextures.com/patterns/carbon-fibre.png",
  "https://www.transparenttextures.com/patterns/dark-matter.png",
  "https://www.transparenttextures.com/patterns/diagmonds-light.png",
  "https://www.transparenttextures.com/patterns/brushed-alum.png",
  "https://www.transparenttextures.com/patterns/black-paper.png",
  "https://www.transparenttextures.com/patterns/white-diamond.png",
  "https://www.transparenttextures.com/patterns/soft-wallpaper.png",
  "https://www.transparenttextures.com/patterns/grid-me.png"
];

const DEFAULT_STATE = {
  navMode: "side",
  dir: "left",
  isDark: true,
  bgType: "image",
  bgImage: PRESET_BGS[0],
  bgColor: "#0f172a",
  primary: "#1890ff",
  fontFamily: "Inter",
  fontSize: 18,
  pageWidth: 100,
  pageHeight: 100,
  marginTop: 40,
  marginBottom: 40,
  marginLeft: 0,
  marginRight: 0,
  tableBg: "rgba(0,0,0,0.6)",
  tableRadius: 16,
  tableBlur: 10,
  tableSize: "middle",
  tableBorderWidth: 1,
  tableBorderColor: "rgba(255,255,255,0.2)",
  tableBorderStyle: "solid",
  tableBgType: "color",
  tableBgImage: "",
  tableBoxType: "glass",
  cardStyle: "glass",
  tableVariant: "basic", 
  fixedHeader: false,
  responsive: true,
  
  folderStyle: "inherit",
  folderIconColor: null,
  folderHover: "scale",
  folderTitleSize: 18,
  folderRadius: 20,
  showFolderCount: true,
};

const CLIENT_PIE_DATA = [
  { name: 'Wedding', value: 35, color: '#1890ff' },
  { name: 'Portrait', value: 28, color: '#52c41a' },
  { name: 'Fashion', value: 22, color: '#faad14' },
  { name: 'Architecture', value: 10, color: '#eb2f96' },
  { name: 'Landscape', value: 15, color: '#722ed1' },
];

const MONTHLY_DATA = [
  { month: 'Jan', shoots: 12, revenue: 45000 },
  { month: 'Feb', shoots: 18, revenue: 62000 },
  { month: 'Mar', shoots: 15, revenue: 58000 },
  { month: 'Apr', shoots: 22, revenue: 89000 },
  { month: 'May', shoots: 19, revenue: 71000 },
  { month: 'Jun', shoots: 25, revenue: 98000 },
];

export default function WavesStudioUltimate() {
  const [activePage, setActivePage] = useState("dashboard");
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  const [userImages, setUserImages] = useState(() => {
    const saved = localStorage.getItem("waves_user_images");
    return saved ? JSON.parse(saved) : [];
  });


  const [clientViewMode, setClientViewMode] = useState("list");

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [allGalleryImages, setAllGalleryImages] = useState([]);


  const [configs, setConfigs] = useState(() => {
    const saved = localStorage.getItem("waves_studio_configs");
    if (saved) return JSON.parse(saved);
    return { 
      dashboard: {...DEFAULT_STATE, bgType: 'color', bgColor: '#141414'},
      gallery: {...DEFAULT_STATE, bgImage: PRESET_BGS[4]}, 
      clients: {...DEFAULT_STATE, bgImage: PRESET_BGS[1]}, 
      albums: {...DEFAULT_STATE, bgImage: PRESET_BGS[2]}
    };
  });

  useEffect(() => {
    localStorage.setItem("waves_studio_configs", JSON.stringify(configs));
  }, [configs]);

  useEffect(() => {
    localStorage.setItem("waves_user_images", JSON.stringify(userImages));
  }, [userImages]);

  const cur = configs[activePage] || DEFAULT_STATE;
  
  const updateConfig = (key, value) => {
    setConfigs(prev => ({ 
      ...prev, 
      [activePage]: { ...prev[activePage], [key]: value } 
    }));
  };

  const resetToDefault = () => {
    const freshState = { 
      gallery: {...DEFAULT_STATE, bgImage: PRESET_BGS[4]}, 
      clients: {...DEFAULT_STATE, bgImage: PRESET_BGS[1]}, 
      dashboard: {...DEFAULT_STATE, bgType: 'color', bgColor: '#141414'},
      albums: {...DEFAULT_STATE, bgImage: PRESET_BGS[2]}
    };
    setConfigs(freshState);
    localStorage.removeItem("waves_studio_configs");
    message.success("Restored to factory defaults");
  };

  const [clients] = useState([
    { key: '1', name: 'James Carter', event: 'Wedding', date: '2026' },
    { key: '2', name: 'Elena Fisher', event: 'Portrait', date: '2026' },
    { key: '3', name: 'Marcus Wright', event: 'Fashion', date: '2026' },
    { key: '4', name: 'Sarah Jenkins', event: 'Architecture', date: '2025' },
    { key: '5', name: 'Julian Oh', event: 'Landscape', date: '2026' },
  ]);

  const [folders] = useState([
    { id: 1, name: "Weddings 2026", count: 24 },
    { id: 2, name: "Fashion Shoots", count: 12 },
    { id: 3, name: "Travel Series", count: 45 },
    { id: 4, name: "Portrait Studio", count: 8 },
    { id: 5, name: "Client Deliverables", count: 3 },
    { id: 6, name: "Raw Drafts", count: 150 },
  ]);

  const navItems = [
    {key:'dashboard', icon:<DashboardOutlined/>, label:'Dashboard'}, 
    {key:'gallery', icon:<PictureOutlined/>, label:'Gallery'}, 
    {key:'albums', icon:<FolderOutlined/>, label:'Albums'},
    {key:'clients', icon:<UserOutlined/>, label:'Clients'}
  ];

  const handlePageBgUpload = (info) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const newImg = e.target.result;
      setUserImages([newImg, ...userImages]);
      message.success("Image added to gallery");
    };
    reader.readAsDataURL(info.file.originFileObj);
  };

  const removeUserImage = (imgUrl) => {
    const filtered = userImages.filter(img => img !== imgUrl);
    setUserImages(filtered);
    if (cur.bgImage === imgUrl) updateConfig("bgImage", PRESET_BGS[0]);
    message.info("Image removed from gallery");
  };

  const openImageModal = (images, index) => {
    setAllGalleryImages(images);
    setCurrentImageIndex(index);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => setIsImageModalOpen(false);

  const goToNextImage = () => setCurrentImageIndex((prev) => (prev + 1) % allGalleryImages.length);
  const goToPrevImage = () => setCurrentImageIndex((prev) => (prev - 1 + allGalleryImages.length) % allGalleryImages.length);

  const galleryImages = [...PRESET_BGS, ...userImages];

  const getTableBoxStyle = () => {
    const base = {
      background: cur.tableBgType === 'image' ? `url(${cur.tableBgImage})` : cur.tableBg,
      borderRadius: cur.tableRadius,
      backdropFilter: `blur(${cur.tableBlur}px)`,
      border: `${cur.tableBorderWidth}px ${cur.tableBorderStyle} ${cur.tableBorderColor}`,
      transition: 'all 0.4s ease',
      backgroundSize: 'cover'
    };

    switch (cur.tableBoxType) {
      case 'solid': return { ...base, backdropFilter: 'none', background: cur.tableBg.replace(/[^,]+(?=\))/, '1') };
      case 'glow': return { ...base, boxShadow: `0 0 20px ${cur.primary}66` };
      case 'neumorphic': return { ...base, boxShadow: cur.isDark ? '10px 10px 20px #000, -10px -10px 20px #333' : '10px 10px 20px #bebebe, -10px -10px 20px #ffffff' };
      case 'gradient': return { ...base, background: `linear-gradient(135deg, ${cur.tableBg}, ${cur.primary}33)` };
      case 'outline': return { ...base, background: 'transparent', backdropFilter: 'none' };
      default: return base; 
    }
  };

  const getCardStyles = (type) => {
    const cardBase = { 
      borderRadius: cur.tableRadius, 
      transition: 'all 0.3s ease', 
      overflow: 'hidden', 
      border: `1px solid ${cur.tableBorderColor}` 
    };
    switch(type) {
        case 'glass': return { ...cardBase, background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)' };
        case 'neumorphic': return { ...cardBase, background: cur.isDark ? '#1a1a1a' : '#e0e0e0', boxShadow: cur.isDark ? '6px 6px 12px #0d0d0d, -6px -6px 12px #272727' : '6px 6px 12px #bebebe, -6px -6px 12px #ffffff', border: 'none' };
        case 'cyber': return { ...cardBase, background: '#000', border: `2px solid ${cur.primary}`, boxShadow: `0 0 10px ${cur.primary}` };
        case 'minimal': return { ...cardBase, background: 'transparent', border: `1px solid ${cur.tableBorderColor}` };
        case 'solid': return { ...cardBase, background: cur.isDark ? '#1f1f1f' : '#fff' };
        case 'floating': return { ...cardBase, background: cur.isDark ? '#262626' : '#fff', boxShadow: '0 10px 20px rgba(0,0,0,0.2)', border: 'none' };
        case 'gradient': return { ...cardBase, background: `linear-gradient(135deg, ${cur.primary}22, rgba(0,0,0,0.5))` };
        case 'soft': return { ...cardBase, background: cur.isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', borderRadius: 24, border: 'none' };
        case 'bordered': return { ...cardBase, background: 'none', border: `3px solid ${cur.primary}` };
        case 'clay': return { ...cardBase, background: cur.primary, boxShadow: 'inset 8px 8px 16px rgba(0,0,0,0.2), 8px 8px 16px rgba(0,0,0,0.1)', border: 'none' };
        default: return cardBase;
    }
  };

  const getFolderCardStyle = () => {
    const styleType = cur.folderStyle === "inherit" ? cur.cardStyle : (cur.folderStyle || cur.cardStyle);
    const baseStyle = getCardStyles(styleType);
    
    return {
      ...baseStyle,
      borderRadius: `${cur.folderRadius || cur.tableRadius}px`,
      textAlign: 'center',
      padding: '24px 16px',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      ...(cur.folderHover === 'lift' && {
        boxShadow: cur.isDark ? '0 15px 35px rgba(0,0,0,0.5)' : '0 15px 35px rgba(0,0,0,0.2)'
      }),
      ...(cur.folderHover === 'glow' && {
        boxShadow: `0 0 30px ${(cur.folderIconColor || cur.primary)}66`
      }),
      ...(cur.folderHover === 'scale' && {
        '&:hover': { transform: 'scale(1.05)' }
      })
    };
  };

  return (
    <ConfigProvider theme={{ 
      algorithm: cur.isDark ? theme.darkAlgorithm : theme.defaultAlgorithm, 
      token: { colorPrimary: cur.primary, fontFamily: cur.fontFamily, fontSize: cur.fontSize } 
    }}>
      <div style={{ 
        minHeight: '100vh',
        backgroundImage: cur.bgType === "image" ? `url(${cur.bgImage})` : 'none',
        backgroundColor: cur.bgType === "color" ? cur.bgColor : 'transparent',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <Layout style={{ minHeight: '100vh', background: 'transparent' }}>
          <Header style={{ 
            background: `linear-gradient(90deg, ${cur.primary}, #40a9ff)`, 
            padding: '0 40px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <CameraOutlined style={{ fontSize: 32, color: '#fff' }} />
              <Title level={3} style={{ margin: 0, color: '#fff', letterSpacing: '-1px' }}>WAVE STUDIOS</Title>
            </div>

            <Menu 
              mode="horizontal" 
              selectedKeys={[activePage]} 
              items={navItems} 
              onClick={(e) => {setActivePage(e.key); setSelectedFolder(null);}}
              style={{ background: 'transparent', border: 'none', color: '#ffffff', flex: 1, justifyContent: 'center' }}
              theme="dark"
            />
            

       <>
  <style>
    {`
    .header-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .action-btn, .settings-btn, .icon-wrapper {
      transition: all 0.3s ease;
    }

    .action-btn:hover,
    .settings-btn:hover,
    .icon-wrapper:hover {
      transform: translateY(-3px) scale(1.05);
    }

    .action-btn:active,
    .settings-btn:active {
      transform: scale(0.92);
    }

    .animated-icon {
      font-size: 20px;
      color: #fff;
      transition: transform 0.3s ease;
    }

    .action-btn:hover .animated-icon {
      transform: rotate(10deg) scale(1.2);
    }

    /* ✅ NON-STOP SPIN */
    .spin-icon {
      display: inline-block;
      animation: spin360 1.2s linear infinite;
    }

    @keyframes spin360 {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .animated-switch {
      transition: all 0.4s ease;
    }

    .animated-switch:hover {
      box-shadow: 0 0 10px rgba(255, 215, 0, 0.6);
      transform: scale(1.1);
    }

    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.08); }
      100% { transform: scale(1); }
    }

    .settings-btn {
      border-radius: 100px;
    }

    .settings-btn:hover {
      animation: pulse 0.6s ease;
    }
    `}
  </style>

  <Space className="header-actions">
    <div className="icon-wrapper">
      <Switch
        checkedChildren={<BulbFilled />}
        unCheckedChildren={<BulbOutlined />}
        checked={cur.isDark}
        onChange={(v) => updateConfig("isDark", v)}
        className="animated-switch"
      />
    </div>

    <Tooltip title="Profile">
  <Button
    type="text"
    icon={<ProfileIcon className="animated-icon" />}
    onClick={() => setProfileModalOpen(true)} // This calls the state we made in Step 1
    className="action-btn"
  />
</Tooltip>

   {/* THE MODAL CONTENT */}
      <Modal
        title="User Profile"
        open={isProfileModalOpen}
        onCancel={() => setProfileModalOpen(false)}
        footer={null}
        width={500}
        centered
        styles={{ body: { padding: '24px' } }} // This fixes the bodyStyle warning
      >
        <div style={{ textAlign: 'center' }}>
          <ProfileIcon style={{ fontSize: '48px', color: cur.primary }} />
          <Title level={3}>My Profile</Title>
          <Text type="secondary">Studio Management</Text>
          <Divider />
          <Button block type="primary" onClick={() => setProfileModalOpen(false)}>
            Close
          </Button>
        </div>
      </Modal>

    <Button
      type="primary"
      icon={<SettingOutlined className="spin-icon" />}
      onClick={() => setDrawerOpen(true)}
      className="settings-btn"
      style={{ background: '#1890ff', color: cur.white }}
    />
  </Space>
</>
          </Header>

          <Layout style={{ background: 'transparent' }}>
            {(cur.navMode === "side" || cur.navMode === "combo") && (
              <Sider collapsible collapsed={collapsed} trigger={null} style={{ background: cur.isDark ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)' }}>
                <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', color: cur.primary }}>
                  <CameraOutlined style={{fontSize: 24}} />
                </div>
                <Menu theme={cur.isDark ? "dark" : "light"} mode="inline" selectedKeys={[activePage]} items={navItems} onClick={(e)=>{setActivePage(e.key); setSelectedFolder(null);}} style={{background:'transparent', border:'none'}} />
              </Sider>
            )}

            <Layout style={{ background: 'transparent' }}>
              <Content style={{ padding: '40px 40px', display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '100%', maxWidth: '1280px' }}>
                  
                  {activePage === 'dashboard' ? (
                    <div>

                      
                      {/* Flip Card Styles */}
                      <h2>Dashboard Overview</h2>
<style>
{`
.flip-card {
  perspective: 1000px;
  height: 240px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.flip-card-back {
  transform: rotateY(180deg);
}
`}
</style>

<Row gutter={[24, 24]} style={{ marginBottom: 60 }}>
  {[
    {
      title: "Total Clients",
      value: "142",
      icon: "👥",
      color: "#1890ff",
      back: { label1: "New This Month", val1: "18", label2: "Retention", val2: "92%" }
    },
    {
      title: "Shoots This Year",
      value: "87",
      icon: "📸",
      color: "#52c41a",
      back: { label1: "This Month", val1: "9", label2: "Completion Rate", val2: "88%" }
    },
    {
      title: "Deliverables Sent",
      value: "203",
      icon: "📤",
      color: "#faad14",
      back: { label1: "Pending", val1: "12", label2: "On-Time Delivery", val2: "95%" }
    },
    {
      title: "Total Revenue",
      value: "$248k",
      icon: "💰",
      color: "#eb2f96",
      back: { label1: "This Month", val1: "$21k", label2: "Growth", val2: "+12%" }
    },
    {
      title: "Avg. Session Time",
      value: "4.2h",
      icon: "⏱️",
      color: "#722ed1",
      back: { label1: "Longest", val1: "7h", label2: "Efficiency", val2: "86%" }
    },
    {
      title: "5-Star Reviews",
      value: "94",
      icon: "⭐",
      color: "#f5222d",
      back: { label1: "This Month", val1: "11", label2: "Satisfaction", val2: "97%" }
    }
  ].map((item, i) => (
    <Col xs={24} sm={12} md={8} lg={4} key={i}>
      
      <div className="flip-card">
        <div className="flip-card-inner">

          {/* Front */}
          <div className="flip-card-front">
            <Card style={{ ...getCardStyles(cur.cardStyle), textAlign: "center", height: "70%" }}>
              <div style={{ fontSize: 46, marginBottom: 12 }}>{item.icon}</div>
              <Title level={3} style={{ margin: 0, color: item.color }}>
                {item.value}
              </Title>
              <Text type="secondary">{item.title}</Text>
            </Card>
          </div>

          {/* Back */}
          <div className="flip-card-back">
            <Card style={{ ...getCardStyles(cur.cardStyle), height: "100%" }}>
              
              <Title level={5} style={{ marginBottom: 10 }}>
                {item.title} Insights
              </Title>

              <div style={{ marginBottom: 8 }}>
                <Text type="secondary">{item.back.label1}</Text><br />
                <Text strong>{item.back.val1}</Text>
              </div>

              <div style={{ marginBottom: 8 }}>
                <Text type="secondary">{item.back.label2}</Text><br />
                <Text strong>{item.back.val2}</Text>
              </div>

              <Progress 
                percent={parseInt(item.back.val2) || 80} 
                strokeColor={item.color} 
                size="small"
              />

            </Card>
          </div>

        </div>
      </div>

    </Col>
  ))}
</Row>
{/* 2. Work Progress Completed */}
<Title level={4} style={{ marginBottom: 16 }}>
  Work Progress Completed
</Title>

<style>
{`
.cube-wrapper {
  perspective: 1000px;
}

.cube-inner {
  position: relative;
  width: 100%;
  height: 160px;
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
}

/* Hover cube rotate */
.cube-wrapper:hover .cube-inner {
  transform: rotateX(-90deg);
}

.cube-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Half height = 80px */
.cube-front {
  transform: translateZ(80px);
}

.cube-top {
  transform: rotateX(90deg) translateZ(80px);
}
`}
</style>

<Row gutter={[24, 24]}>
  {[
    {
      title: "Monthly Shoot Completion",
      percent: 68,
      color: cur.primary,
      desc: "68 out of 100 shoots completed"
    },
    {
      title: "Deliverables Ready",
      percent: 92,
      color: "#52c41a",
      desc: "92% deliverables sent"
    },
    {
      title: "Pending Shoots",
      percent: 35,
      color: "#faad14",
      desc: "35 shoots pending"
    },
    {
      title: "Editing Progress",
      percent: 75,
      color: "#722ed1",
      desc: "75% editing completed"
    },
    {
      title: "Client Approvals",
      percent: 60,
      color: "#13c2c2",
      desc: "60% approved by clients"
    },
    {
      title: "Monthly Target",
      percent: 80,
      color: "#eb2f96",
      desc: "80% of monthly goal reached"
    }
  ].map((item, i) => (
    <Col xs={24} md={12} lg={8} key={i}>
      
      {/* MAIN CARD */}
      <Card
        style={{
          ...getCardStyles(cur.cardStyle),
          overflow: "hidden"
        }}
        bodyStyle={{ padding: 0 }}
      >
        <div className="cube-wrapper">
          <div className="cube-inner">

            {/* FRONT */}
            <div className="cube-face cube-front" style={{ padding: 16 }}>
              <Text strong>{item.title}</Text>
              <Progress percent={item.percent} strokeColor={item.color} style={{ marginTop: 12 }} />
              <Text type="secondary">{item.desc}</Text>
            </div>

            {/* TOP */}
            <div className="cube-face cube-top" style={{ padding: 16 }}>
              <Text strong>{item.title} Insights</Text>

              <div style={{ marginTop: 10 }}>
                <Text type="secondary">Performance</Text><br />
                <Text strong>{item.percent}%</Text>
              </div>

              <div style={{ marginTop: 10 }}>
                <Text type="secondary">Status</Text><br />
                <Text strong>
                  {item.percent > 80 ? "Excellent" : item.percent > 60 ? "Good" : "Needs Attention"}
                </Text>
              </div>
            </div>

          </div>
        </div>
      </Card>

    </Col>
  ))}
</Row>
<br></br>
<br></br>


    <br></br>              
                      <Row gutter={[24, 24]} style={{ marginBottom: 60 }}>
                        <Col xs={24} lg={12}>
                          <Card title="Event Distribution 2026" style={getCardStyles(cur.cardStyle)}>
  <ResponsiveContainer width="100%" height={380}>
    <PieChart>

      <Pie
        data={CLIENT_PIE_DATA}
        cx="50%"
        cy="50%"
        innerRadius={75}
        outerRadius={135}
        dataKey="value"

        /* 🔥 Animation */
        isAnimationActive={true}
        animationBegin={0}
        animationDuration={1200}
        animationEasing="ease-out"

        /* 🔥 Hover expand effect */
        activeIndex={-1}
        activeShape={(props) => {
          const { outerRadius = 0 } = props;
          return <Sector {...props} outerRadius={outerRadius + 12} />;
        }}

        /* 🔥 Label inside */
        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
      >
        {CLIENT_PIE_DATA.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={entry.color}
            style={{
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
          />
        ))}
      </Pie>

      <RechartsTooltip />
      <Legend />

      {/* 🔥 Center Text */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fontSize: 18, fontWeight: 600, fill: "white" }}
      >
        Events
      </text>

    </PieChart>
  </ResponsiveContainer>
</Card>
                        </Col>

                      
                        <Col xs={24} lg={12}>
                          <Card title="Monthly Shoots & Revenue (2026)" style={getCardStyles(cur.cardStyle)}>
  <ResponsiveContainer width="100%" height={380}>
    <BarChart
      data={MONTHLY_DATA}

      /* 🔥 Entry Animation (chart level) */
      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />

      <XAxis dataKey="month" />
      <YAxis yAxisId="left" />
      <YAxis yAxisId="right" orientation="right" />

      <RechartsTooltip />
      <Legend />

      {/* 🔥 Shoots Bar */}
      <Bar
        yAxisId="left"
        dataKey="shoots"
        fill="#52c41a"
        name="Shoots"
        radius={[8, 8, 0, 0]}

        /* Animation */
        isAnimationActive={true}
        animationDuration={1200}
        animationEasing="ease-out"

        /* Hover highlight */
        onMouseOver={(e) => (e.target.style.opacity = 0.7)}
        onMouseOut={(e) => (e.target.style.opacity = 1)}
      />

      {/* 🔥 Revenue Bar */}
      <Bar
        yAxisId="right"
        dataKey="revenue"
        fill="#1890ff"
        name="Revenue ($)"
        radius={[8, 8, 0, 0]}

        /* Animation (slight delay for stagger effect) */
        isAnimationActive={true}
        animationBegin={300}
        animationDuration={1200}
        animationEasing="ease-out"

        /* Hover highlight */
        onMouseOver={(e) => (e.target.style.opacity = 0.7)}
        onMouseOut={(e) => (e.target.style.opacity = 1)}
      />
    </BarChart>
  </ResponsiveContainer>
</Card>
                        </Col>
                      </Row>

                  
                      <Title level={4} style={{ marginBottom: 16 }}>Recent Captures</Title>
                     <style>
{`
/* 3D perspective */
.slick-list {
  perspective: 1200px;
}

/* Default slides */
.slick-slide {
  transition: transform 0.6s ease, opacity 0.6s ease;
  opacity: 0.5;
  transform: scale(0.85) rotateY(12deg);
}

/* Active slide (center feel even without centerMode) */
.slick-active {
  opacity: 1;
  transform: scale(0.95) rotateY(0deg);
}

/* Card hover animation */
.carousel-card {
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.carousel-card:hover {
  transform: scale(1.05);
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}
`}
</style>

<Carousel
  autoplay
  autoplaySpeed={2000}   // 🔥 moves every 2 sec
  speed={800}            // smooth animation
  dots={false}
  infinite
  pauseOnHover
  style={{ marginBottom: 60 }}
>
  {galleryImages.slice(0, 8).map((img, idx) => (
    <div key={idx}>
      <Card
        hoverable
        className="carousel-card"
        style={getCardStyles(cur.cardStyle)}
      >
        <div
          style={{
            height: 320,
            background: `url(${img}) center/cover`,
            borderRadius: 12
          }}
          onClick={() => openImageModal(galleryImages, idx)}
        />
        <Meta title={`Shot #${idx + 1}`} style={{ padding: '16px' }} />
      </Card>
    </div>
  ))}
</Carousel>

                      
                      <Title level={4} style={{ marginBottom: 16 }}>Customer Reviews</Title>
                      <Row gutter={[24, 24]}>
                        {[
                          { name: "Sarah Patel", review: "Absolutely stunning photos! Captured our wedding perfectly.", rating: 5 },
                          { name: "Rahul Sharma", review: "Best portrait session ever. Highly recommended!", rating: 5 },
                          { name: "Priya Menon", review: "Professional and creative. Love the final album!", rating: 4 },
                        ].map((review, i) => (
                          <Col xs={24} md={8} key={i}>
                            <Card style={getCardStyles(cur.cardStyle)}>
                              <Rate disabled defaultValue={review.rating} style={{ color: '#faad14' }} />
                              <Text style={{ display: 'block', marginTop: 12 }}>{review.review}</Text>
                              <Text strong style={{ marginTop: 16, display: 'block' }}>- {review.name}</Text>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  ) : activePage === 'albums' ? (
                
                    <div className={`table-view-${cur.tableVariant}`}>
                      <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Space direction="vertical" size={0}>
                          <Breadcrumb items={[
                            { title: <span onClick={() => setSelectedFolder(null)} style={{cursor:'pointer'}}><FolderOutlined /> Albums</span> },
                            selectedFolder ? { title: selectedFolder.name } : null
                          ].filter(Boolean)} />
                          <Title level={3} style={{ margin: 0 }}>
                            {selectedFolder ? selectedFolder.name : "Storage Explorer"}
                          </Title>
                        </Space>
                        {selectedFolder && (
                          <Button icon={<ArrowLeftOutlined />} onClick={() => setSelectedFolder(null)}>Back to Albums</Button>
                        )}
                      </div>

                      {!selectedFolder ? (
                        <Row gutter={[20, 20]}>
                          {folders.map(folder => (
                            <Col xs={12} sm={8} md={6} key={folder.id}>
                              <Card hoverable style={getFolderCardStyle()} onClick={() => setSelectedFolder(folder)} bodyStyle={{ padding: 0 }}>
                                <div style={{ marginBottom: 16 }}>
                                  <FolderFilled style={{ fontSize: 64, color: cur.folderIconColor || cur.primary }} />
                                </div>
                                <Title level={5} style={{ margin: '8px 0 6px', fontSize: `${cur.folderTitleSize}px`, color: cur.isDark ? '#fff' : '#000' }}>
                                  {folder.name}
                                </Title>
                                {cur.showFolderCount !== false && <Tag color="default" style={{ borderRadius: 12, marginTop: 4 }}>{folder.count} items</Tag>}
                              </Card>
                            </Col>
                          ))}
                          <Col xs={12} sm={8} md={6}>
                            <Card hoverable style={{ ...getCardStyles('minimal'), border: `2px dashed ${cur.tableBorderColor}`, textAlign: 'center', padding: '40px 20px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                              <PlusOutlined style={{ fontSize: 36, color: cur.tableBorderColor, marginBottom: 12 }} />
                              <Text type="secondary">Create New Album</Text>
                            </Card>
                          </Col>
                        </Row>
                      ) : (
                        <div style={{ padding: '40px 0' }}>
                          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<Text style={{color: cur.isDark ? '#fff' : '#000'}}>No images in "{selectedFolder.name}" yet.</Text>}>
                            <Upload customRequest={({ onSuccess }) => onSuccess("ok")} showUploadList={false} onChange={handlePageBgUpload}>
                              <Button type="primary" icon={<UploadOutlined />}>Upload to Folder</Button>
                            </Upload>
                          </Empty>
                        </div>
                      )}
                    </div>
                  ) : activePage === 'clients' ? (
                    <div className={`table-view-${cur.tableVariant}`}>
                      <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Title level={3} style={{
                             letterSpacing: cur.tableVariant === 'neon' ? '3px' : 'normal',
                             textTransform: cur.tableVariant === 'neon' ? 'uppercase' : 'none',
                             color: cur.tableVariant === 'neon' ? cur.primary : 'inherit'
                        }}>Client Directory</Title>
                        
                        <Segmented
                          value={clientViewMode}
                          onChange={setClientViewMode}
                          options={[
                            { label: <BarsOutlined />, value: 'list' },
                            { label: <AppstoreOutlined />, value: 'grid' },
                          ]}
                        />
                      </div>

                      {clientViewMode === 'list' ? (
                        <Table 
                          dataSource={clients} 
                          columns={[{ title: 'Client', dataIndex: 'name' }, { title: 'Event', dataIndex: 'event' }, { title: 'Year', dataIndex: 'date' }]} 
                          pagination={false} 
                          className={`custom-table-${cur.tableVariant}`}
                          size={cur.tableVariant === 'compact' ? 'small' : cur.tableSize}
                          bordered={cur.tableVariant === 'bordered'}
                          showHeader={cur.tableVariant !== 'borderless' && cur.tableVariant !== 'bento'}
                          scroll={cur.fixedHeader ? { y: 300 } : (cur.responsive ? { x: 'max-content' } : {})}
                          rowClassName={(record, index) => {
                              let classes = [];
                              if (cur.tableVariant === 'striped' && index % 2 !== 0) classes.push('row-striped');
                              return classes.join(' ');
                          }}
                          style={{ background: cur.tableVariant === 'terminal' ? '#000' : 'transparent', borderRadius: cur.tableRadius }}
                        />
                      ) : (
                        <Row gutter={[20, 20]}>
                          {clients.map(client => (
                            <Col xs={24} sm={12} md={8} key={client.key}>
                              <Card hoverable style={getCardStyles(cur.cardStyle)}>
                                <Title level={4}>{client.name}</Title>
                                <p><strong>Event:</strong> {client.event}</p>
                                <p><strong>Year:</strong> {client.date}</p>
                                <Tag color="blue" style={{marginTop: 12}}>Active</Tag>
                              </Card>
                            </Col>
                          ))}
                        </Row>
                      )}
                    </div>
                  ) : activePage === 'gallery' ? (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <Title level={3} style={{ margin: 0 }}>Studio Gallery</Title>
                        <Upload customRequest={({ onSuccess }) => onSuccess("ok")} showUploadList={false} onChange={handlePageBgUpload}>
                          <Button icon={<PlusOutlined />} type="primary">Add Photo</Button>
                        </Upload>
                      </div>
                      <Row gutter={[16, 16]}>
                        {galleryImages.map((img, idx) => (
                          <Col xs={24} sm={12} md={8} key={idx}>
                            <Card 
                              hoverable 
                              cover={
                                <div 
                                  style={{ height: 180, background: `url(${img}) center/cover`, cursor: 'pointer' }} 
                                  onClick={() => openImageModal(galleryImages, idx)}
                                />
                              } 
                              style={getCardStyles(cur.cardStyle)}
                            >
                              <Meta title={<span style={{color: (cur.cardStyle === 'clay' || (cur.isDark && cur.cardStyle !== 'minimal')) ? '#fff' : '#000'}}>Item #{idx + 1}</span>} />
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </>
                  ) : <Empty description="Workspace Active" />}
                </div>
              </Content>

              <Footer style={{ textAlign: 'center', background: cur.isDark ? '#000000' : '#ffffff', padding: '60px 40px' }}>
                <Text type="secondary">© 2026 Wave Studios • Professional Photography Platform</Text>
              </Footer>
            </Layout>
          </Layout>
        </Layout>
      </div>

     

      {/* Gallery Image Modal */}
      <Modal open={isImageModalOpen} onCancel={closeImageModal} footer={null} width={900} centered closeIcon={<CloseCircleFilled style={{ fontSize: 24, color: '#fff' }} />} bodyStyle={{ padding: 0, background: '#000' }}>
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <img src={allGalleryImages[currentImageIndex]} alt="Preview" style={{ maxHeight: '80vh', maxWidth: '100%', objectFit: 'contain' }} />
          <Button icon={<LeftOutlined />} onClick={goToPrevImage} style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', zIndex: 10 }} size="large" />
          <Button icon={<RightOutlined />} onClick={goToNextImage} style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', zIndex: 10 }} size="large" />
          <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.7)', padding: '4px 16px', borderRadius: 20, color: '#fff' }}>
            {currentImageIndex + 1} / {allGalleryImages.length}
          </div>
        </div>
      </Modal>

  
      <Drawer 
        title={
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'right', width:'100%', paddingRight: 20}}>
            <span>Theme Customizer</span>
            <Button icon={<ReloadOutlined/>} size="small" onClick={resetToDefault}>Restore</Button>
          </div>
        } 
        open={drawerOpen} 
        onClose={() => setDrawerOpen(false)} 
        size="medium"
      >
        <Collapse ghost accordion defaultActiveKey={['table-creative']}>
          <Panel header={<span><ThunderboltOutlined />Table Styles</span>} key="table-creative">
            <Space direction="vertical" style={{ width: '100%' }} size="middle">
              <Text strong>Select Preset Personality</Text>
              <Select block value={cur.tableVariant} onChange={(v) => updateConfig("tableVariant", v)} options={[
                { label: 'Standard Styles', title: 'group', options: [
                  { label: 'Basic Clean', value: 'basic' },
                  { label: 'Zebra Striped', value: 'striped' },
                  { label: 'Interactive Hover', value: 'hover' },
                  { label: 'Full Bordered', value: 'bordered' },
                  { label: 'Floating Card', value: 'card' },
                ]},
                { label: 'Innovative Styles', title: 'group', options: [
                  { label: 'Bento Grid (Modern Dash)', value: 'bento' },
                  { label: 'Cyber Neon (Glow)', value: 'neon' },
                  { label: 'Floating Glass (3D)', value: 'floating' },
                  { label: 'Retro Terminal (Hacker)', value: 'terminal' },
                  { label: 'Minimal Abstract (Gallery)', value: 'minimal-abstract' },
                ]}
              ]} />
              <Divider plain style={{margin: '4px 0'}}>Layout</Divider>
              <Row gutter={16}>
                <Col span={12}>
                  <Text size="small">Fixed Header</Text><br/>
                  <Switch size="small" checked={cur.fixedHeader} onChange={(v) => updateConfig("fixedHeader", v)} />
                </Col>
                <Col span={12}>
                  <Text size="small">Responsive</Text><br/>
                  <Switch size="small" checked={cur.responsive} onChange={(v) => updateConfig("responsive", v)} />
                </Col>
              </Row>
              <Text>Row Density</Text>
              <Segmented block value={cur.tableSize} onChange={(v) => updateConfig("tableSize", v)} options={['large', 'middle', 'small']} />
              <Text>Table Color</Text>
              <ColorPicker block showText value={cur.tableBg} onChange={(c) => updateConfig("tableBg", `rgba(${c.toRgb().r}, ${c.toRgb().g}, ${c.toRgb().b}, ${c.toRgb().a})`)} />
            </Space>
          </Panel>

          <Panel header={<span><AppstoreOutlined /> Card Styles & Gallery</span>} key="cards">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text>Select Card Theme</Text>
              <Select block value={cur.cardStyle} onChange={(v) => updateConfig("cardStyle", v)} options={[
                { label: 'Glassmorphism', value: 'glass' },
                { label: 'Neumorphic', value: 'neumorphic' },
                { label: 'Cyber Glow', value: 'cyber' },
                { label: 'Minimalist', value: 'minimal' },
                { label: 'Solid Flat', value: 'solid' },
                { label: 'Floating Depth', value: 'floating' },
                { label: 'Vibrant Gradient', value: 'gradient' },
                { label: 'Soft Edge', value: 'soft' },
                { label: 'Bold Border', value: 'bordered' },
                { label: 'Claymorphism', value: 'clay' },
              ]} />
            </Space>
          </Panel>

          <Panel header={<span><FolderOpenOutlined /> Folder & Album Styles</span>} key="folders">
            <Space direction="vertical" style={{ width: '100%' }} size="middle">
              <Text strong>Folder Card Style</Text>
              <Select block value={cur.folderStyle} onChange={(v) => updateConfig("folderStyle", v)} options={[
                { label: 'Same as General Card Style', value: 'inherit' },
                { label: 'Glassmorphism', value: 'glass' },
                { label: 'Neumorphic', value: 'neumorphic' },
                { label: 'Cyber Glow', value: 'cyber' },
                { label: 'Minimalist', value: 'minimal' },
                { label: 'Floating Depth', value: 'floating' },
                { label: 'Solid Flat', value: 'solid' },
                { label: 'Vibrant Gradient', value: 'gradient' },
                { label: 'Soft Edge', value: 'soft' },
                { label: 'Bold Border', value: 'bordered' },
                { label: 'Claymorphism', value: 'clay' },
              ]} />
              <Divider plain>Appearance Settings</Divider>
              <Row gutter={16}>
                <Col span={12}>
                  <Text>Folder Icon Color</Text>
                  <ColorPicker block showText value={cur.folderIconColor || cur.primary} onChange={(c) => updateConfig("folderIconColor", c.toHexString())} />
                </Col>
                <Col span={12}>
                  <Text>Show Item Count</Text><br/>
                  <Switch checked={cur.showFolderCount} onChange={(v) => updateConfig("showFolderCount", v)} />
                </Col>
              </Row>
              <Text>Hover Animation</Text>
              <Segmented block value={cur.folderHover} onChange={(v) => updateConfig("folderHover", v)} options={[
                { label: 'Scale Up', value: 'scale' },
                { label: 'Lift & Shadow', value: 'lift' },
                { label: 'Glow Pulse', value: 'glow' },
                { label: 'None', value: 'none' }
              ]} />
              <Text>Folder Title Font Size</Text>
              <Slider min={14} max={26} value={cur.folderTitleSize} onChange={(v) => updateConfig("folderTitleSize", v)} />
              <Divider plain>Border Radius</Divider>
              <Slider min={8} max={36} value={cur.folderRadius || cur.tableRadius} onChange={(v) => updateConfig("folderRadius", v)} />
            </Space>
          </Panel>

          <Panel header={<span><BgColorsOutlined />Background</span>} key="bg">
            <Space direction="vertical" style={{ width: '100%' }} size="middle">
              <Segmented block value={cur.bgType} options={['image', 'color']} onChange={(v) => updateConfig("bgType", v)} />
              {cur.bgType === 'color' ? (
                <ColorPicker block showText value={cur.bgColor} onChange={(c) => updateConfig("bgColor", c.toHexString())} />
              ) : (
                <>
                  <Text type="secondary">System Presets</Text>
                  <Row gutter={[8, 8]}>
                    {PRESET_BGS.map((u, i) => (
                      <Col span={6} key={i}>
                        <div onClick={() => updateConfig("bgImage", u)} style={{ height: 45, background: `url(${u}) center/cover`, borderRadius: 8, cursor: 'pointer', border: cur.bgImage === u ? `3px solid ${cur.primary}` : '1px solid rgba(255,255,255,0.1)' }} />
                      </Col>
                    ))}
                  </Row>
                  <Divider plain>User Gallery</Divider>
                  {userImages.length > 0 && (
                    <Row gutter={[8, 8]}>
                      {userImages.map((u, i) => (
                        <Col span={6} key={i} style={{ position: 'relative' }}>
                          <div onClick={() => updateConfig("bgImage", u)} style={{ height: 45, background: `url(${u}) center/cover`, borderRadius: 8, cursor: 'pointer', border: cur.bgImage === u ? `3px solid ${cur.primary}` : '1px solid rgba(255,255,255,0.1)' }} />
                          <CloseCircleFilled onClick={(e) => { e.stopPropagation(); removeUserImage(u); }} style={{ position: 'absolute', top: -5, right: 3, color: '#ff4d4f', fontSize: 16, cursor: 'pointer', background: '#fff', borderRadius: '50%' }} />
                        </Col>
                      ))}
                    </Row>
                  )}
                  <Upload customRequest={({ onSuccess }) => onSuccess("ok")} showUploadList={false} onChange={handlePageBgUpload}>
                    <Button block icon={<UploadOutlined />} type="dashed">Upload Custom Background</Button>
                  </Upload>
                </>
              )}
            </Space>
          </Panel>

          <Panel header={<span><BorderOutlined /> Container Margins & Borders</span>} key="margin">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Row gutter={10}>
                <Col span={12}>Top <Slider min={0} max={200} value={cur.marginTop} onChange={(v) => updateConfig("marginTop", v)} /></Col>
                <Col span={12}>Bottom <Slider min={0} max={200} value={cur.marginBottom} onChange={(v) => updateConfig("marginBottom", v)} /></Col>
              </Row>
              <Text>Container Box Effect</Text>
              <Segmented block value={cur.tableBoxType} onChange={(v) => updateConfig("tableBoxType", v)} options={['glass', 'solid', 'glow', 'neumorphic', 'gradient', 'outline']} />
              <Divider orientation="left" plain>Texture Overlays</Divider>
              <Segmented block value={cur.tableBgType} onChange={(v) => updateConfig("tableBgType", v)} options={[{label:'Color/Glass', value:'color'}, {label:'Image Texture', value:'image'}]} />
              {cur.tableBgType === 'image' && (
                <Row gutter={[4, 4]}>
                  {TABLE_TEXTURES.map((u, i) => (
                    <Col span={6} key={i}>
                      <div onClick={() => updateConfig("tableBgImage", u)} style={{ height: 30, background: `url(${u})`, border: cur.tableBgImage === u ? `2px solid ${cur.primary}` : '1px solid #444', cursor: 'pointer', borderRadius: 4 }} />
                    </Col>
                  ))}
                </Row>
              )}
              <Divider orientation="left" plain>Border Customization</Divider>
              <div style={{ display: 'flex', gap: 10 }}>
                <Slider style={{ flex: 1 }} min={0} max={10} value={cur.tableBorderWidth} onChange={(v) => updateConfig("tableBorderWidth", v)} />
                <ColorPicker value={cur.tableBorderColor} onChange={(c) => updateConfig("tableBorderColor", c.toHexString())} />
              </div>
            </Space>
          </Panel>

          <Panel header={<span><LayoutOutlined /> Navigation & Menu</span>} key="navigation">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text>Menu Mode</Text>
              <Segmented block value={cur.navMode} onChange={(v) => updateConfig("navMode", v)} options={['side', 'top', 'combo']} />
              <Text>Sidebar Position</Text>
              <Segmented block value={cur.dir} onChange={(v) => updateConfig("dir", v)} options={['left', 'right']} />
            </Space>
          </Panel>

          <Panel header={<span><FontSizeOutlined /> Typography & Text</span>} key="typography">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text>Font Family</Text>
              <Select block value={cur.fontFamily} onChange={(v) => updateConfig("fontFamily", v)} options={["Inter", "Poppins", "Roboto", "Montserrat"].map(f => ({ label: f, value: f }))} />
              <Text>Font Size</Text>
              <Slider min={10} max={24} value={cur.fontSize} onChange={(v) => updateConfig("fontSize", v)} />
            </Space>
          </Panel>

          <Panel header={<span><ArrowsAltOutlined /> Canvas Scaling</span>} key="canvas">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text>Width %</Text><Slider min={50} max={100} value={cur.pageWidth} onChange={(v) => updateConfig("pageWidth", v)} />
              <Text>Height VH</Text><Slider min={50} max={150} value={cur.pageHeight} onChange={(v) => updateConfig("pageHeight", v)} />
            </Space>
          </Panel>
        </Collapse>
      </Drawer>
    </ConfigProvider>
  );
}

function FolderFilled({ style }) {
  return (
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024" style={style}>
      <path d="M880 298.4H521L403.7 186.1c-1.5-1.4-3.5-2.2-5.5-2.2H144c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V330.4c0-17.7-14.3-32-32-32zM840 768H184V256h188.5l119.6 114.4H840V768z" />
    </svg>
  );
}