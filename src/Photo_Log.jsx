import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Button,
  Input,
  Space,
  Drawer,
  Slider,
  Typography,
  ColorPicker,
  Segmented,
  Card,
  Upload,
  message,
  Tooltip,
} from "antd";

import {
  SettingOutlined,
  MailOutlined,
  LockOutlined,
  UploadOutlined,
  DeleteOutlined,
  CameraFilled,
  BulbOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

export default function PhotoLog({ onLogin }) {
  const [open, setOpen] = useState(false);
  const [msgApi, contextHolder] = message.useMessage();
  const [isAnimating, setIsAnimating] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [settings, setSettings] = useState({
    dark: true,
    bgColor: "#0a1428",
    mode: "ai",
    bgImage: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5",
    customImage: null,
    width: 460,
    height: 460,    
    intensity: 75,
  });

  const [temp, setTemp] = useState(settings);

  const themes = [
    "https://images.unsplash.com/photo-1554048612-b6a482bc67e5",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a9c",
    "https://images.unsplash.com/photo-1617791160505-6f00504e3519",
  ];

  useEffect(() => {
    if (temp.mode !== "carousel") return;
    const interval = setInterval(() => {
      setSettings((prev) => ({
        ...prev,
        bgImage: themes[(themes.indexOf(prev.bgImage) + 1) % themes.length],
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, [temp.mode]);

  const applyChanges = () => {
    setSettings(temp);
    localStorage.setItem("photolog_settings", JSON.stringify(temp));
    msgApi.success("Blue Atmosphere Applied");
  };

  const resetAll = () => {
    const reset = { ...settings, bgImage: themes[0], customImage: null, mode: "ai" };
    setSettings(reset);
    setTemp(reset);
    localStorage.removeItem("photolog_settings");
    msgApi.success("Studio Reset");
  };

  const handleUpload = (file) => {
    const url = URL.createObjectURL(file);
    setTemp((prev) => ({ ...prev, customImage: url, bgImage: url, mode: "custom" }));
    msgApi.success("Frame Loaded");
    return false;
  };

  const removeImage = () => {
    setTemp((prev) => ({ ...prev, customImage: null, mode: "ai" }));
  };

  const handleLogin = () => {
    if (!email || !password) {
      return msgApi.warning("Enter your credentials");
    }

    setIsAnimating(true);
    setShowWelcome(false);

    setTimeout(() => setShowWelcome(true), 380);

    setTimeout(() => {
      setIsAnimating(false);
      setShowWelcome(false);
      if (onLogin) onLogin({ email, password });
    }, 2300);
  };

  const getBgStyle = () => {
    const bg = temp.customImage || temp.bgImage;
    return bg ? `url(${bg})` : "none";
  };

  return (
    <>
      {contextHolder}

      {/* Camera Flash Animation */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              background: "#050b1a",
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.88, 0] }}
              transition={{ duration: 0.35 }}
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, #00ccff, #0099ff, #00ccff)",
                zIndex: 25,
              }}
            />

            <motion.div
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0.04 }}
              transition={{ duration: 0.75, ease: "circOut" }}
              style={{
                position: "absolute",
                inset: 0,
                background: "repeating-linear-gradient(#0a1428 0px, #0a1428 18px, #050b1a 18px, #050b1a 36px)",
                zIndex: 20,
              }}
            />

            <motion.div
              initial={{ scale: 0.6 }}
              animate={{ scale: 2.1 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 30,
                color: "#60d4ff",
              }}
            >
              <CameraFilled style={{ fontSize: "185px", filter: "drop-shadow(0 0 80px #00aaff)" }} />
            </motion.div>

            <AnimatePresence>
              {showWelcome && (
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 40 }}>
                  <Text style={{ fontSize: "24px", letterSpacing: "5px", color: "#000000", fontWeight: 600 }}>
                    WELCOME TO
                  </Text>
                  <div style={{ display: "flex", marginTop: 12 }}>
                    <motion.div initial={{ opacity: 0, x: -160 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: "backOut" }}>
                      <Title level={1} style={{ fontSize: "102px", fontWeight: 900, margin: 0, letterSpacing: "-5px", color: "#60d4ff", textShadow: "0 0 45px #00aaff" }}>
                        WAVE
                      </Title>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 160 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: "backOut", delay: 0.2 }}>
                      <Title level={1} style={{ fontSize: "102px", fontWeight: 900, margin: 0, letterSpacing: "-5px", color: "#0088ff", textShadow: "0 0 45px #0066cc" }}>
                        STUDIO
                      </Title>
                    </motion.div>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Background */}
      <div
        style={{
          height: "100vh",
          width: "100vw",
          position: "relative",
          backgroundImage: getBgStyle(),
          backgroundColor: settings.bgColor,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(rgba(5,11,26,0.7), rgba(10,20,45,0.95))",
          }}
        />

        <Tooltip title="Customize Studio" placement="left">
          <Button
            shape="circle"
            icon={<SettingOutlined />}
            onClick={() => setOpen(true)}
            style={{ position: "absolute", top: 30, right: 30, zIndex: 100 }}
          />
        </Tooltip>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ 
            width: `${settings.width}px`, 
            height: `${settings.height}px`,
            zIndex: 50 
          }}
        >
          <Card
            style={{
              width: "100%",
              height: "100%",
              background: "rgba(15, 28, 55, 0.32)",       
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
              border: "2.5px solid rgba(0, 170, 255, 0.7)",
              borderRadius: 32,
              boxShadow: `
                0 35px 90px rgba(0, 0, 0, 0.75),
                0 0 65px rgba(0, 170, 255, 0.55),          // Outer neon glow
                inset 0 0 45px rgba(0, 170, 255, 0.25)     // Inner glow
              `,
              padding: "32px 40px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <Title 
                level={1}
                style={{ 
                  color: "#ffffff", 
                  fontSize: "46px",
                  fontWeight: 900,
                  letterSpacing: "-2px",
                  marginBottom: 8,
                }}
              >
                WAVE <span style={{ color: "#00ccff" }}>STUDIO</span>
              </Title>

              <Text style={{ color: "#a0d8ff", fontSize: "16px" }}>
                Professional Photography Portal
              </Text>

              <Space direction="vertical" size="large" style={{ width: "100%", marginTop: 28 }}>
                <Input
                  size="large"
                  placeholder=" Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  prefix={<MailOutlined style={{ color: "#88ccff" }} />}
                  style={{
                    height: 58,
                    borderRadius: 14,
                    background: "rgb(255, 255, 255)",
                    border: "1px solid rgba(0,170,255,0.4)",
                    color: "#000000",
                  }}
                />

                <Input.Password
                  size="large"
                  placeholder="Access Key"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  prefix={<LockOutlined style={{ color: "#88ccff" }} />}
                  style={{
                    height: 58,
                    borderRadius: 14,
                    background: "rgb(255, 255, 255)",
                    border: "1px solid rgba(0,170,255,0.4)",
                    color: "#000000",
                  }}
                />

                <Button
                  type="primary"
                  size="large"
                  block
                  onClick={handleLogin}
                  style={{
                    height: 62,
                    borderRadius: 16,
                    fontSize: "17.5px",
                    fontWeight: "bold",
                    background: "linear-gradient(90deg, #00aaff, #0088ff)",
                    border: "none",
                    boxShadow: "0 15px 40px rgba(0, 136, 255, 0.5)",
                    marginTop: 8,
                  }}
                >
                  Login to Studio
                </Button>
              </Space>
            </div>
          </Card>
        </motion.div>

        {/* Settings Drawer */}
        <Drawer
          title={<span><BulbOutlined style={{ color: "#ffffff" }} /> Studio Control</span>}
          open={open}
          onClose={() => setOpen(false)}
          width={420}
          style={{ background: "#ffffff" }}
        >
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div>
              <Text strong style={{ color: "#a0e0ff" }}>Visual Mode</Text>
              <Segmented
                block
                options={[
                  { label: "Blue AI", value: "ai" },
                  { label: "Carousel", value: "carousel" },
                  { label: "Fixed", value: "fixed" },
                  { label: "Custom", value: "custom" },
                ]}
                value={temp.mode}
                onChange={(v) => setTemp({ ...temp, mode: v })}
              />
            </div>

            <ColorPicker value={temp.bgColor} onChange={(c) => setTemp({ ...temp, bgColor: c.toHexString() })} showText />

            <div>
              <Text strong style={{ color: "#a0e0ff" }}>Presets</Text>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginTop: 12 }}>
                {themes.map((img, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setTemp({ ...temp, bgImage: img, mode: "fixed" })}
                    style={{
                      height: 105,
                      borderRadius: 12,
                      backgroundImage: `url(${img})`,
                      backgroundSize: "cover",
                      cursor: "pointer",
                      border: temp.bgImage === img ? "3px solid #00aaff" : "2px solid #003366",
                    }}
                  />
                ))}
              </div>
            </div>

            <Upload beforeUpload={handleUpload} showUploadList={false}>
              <Button icon={<UploadOutlined />} block size="large">Upload Background</Button>
            </Upload>

            <Button danger icon={<DeleteOutlined />} onClick={removeImage} block>Remove Image</Button>

            <div style={{ display: "flex", gap: 12 }}>
              <Button type="primary" onClick={applyChanges} block>Apply Changes</Button>
              <Button danger onClick={resetAll} block>Reset</Button>
            </div>
          </Space>
        </Drawer>
      </div>
    </>
  );
}