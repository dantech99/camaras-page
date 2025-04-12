"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Package,
  CreditCard,
  CheckCircle,
  X,
  FileText,
  User,
  ArrowLeft,
} from "lucide-react";


export function Scheduling() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPhotographer, setSelectedPhotographer] = useState<
    string | null
  >(null);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string>("");

  // Datos del solicitante (ya existentes)
  const solicitanteData = {
    nombre: "Juan Pérez",
    email: "juan.perez@ejemplo.com",
    telefono: "+52 123 456 7890",
    direccion: "Calle Principal #123, Ciudad de México",
  };

  const photographers = [
    "Eddy",
    "Luisfer",
    "Pacho Velandia",
    "Dreivko",
    "Personalizado",
  ];
  const packages = [
    "Paquete 1",
    "Paquete 2",
    "Paquete 3",
    "Paquete 4",
    "Paquete 5",
  ];
  const paymentMethods = [
    "Tarjeta de crédito",
    "PayPal",
    "Transferencia bancaria",
    "Efectivo",
  ];

  // Imágenes para los fotógrafos (usando placeholders)
  const photographerImages = {
    Eddy: "/placeholder.svg?height=300&width=200&text=Eddy",
    Luisfer: "/placeholder.svg?height=300&width=200&text=Luisfer",
    "Pacho Velandia":
      "/placeholder.svg?height=300&width=200&text=Pacho+Velandia",
    Dreivko: "/placeholder.svg?height=300&width=200&text=Dreivko",
    Personalizado: "/placeholder.svg?height=300&width=200&text=Personalizado",
  };

  // Imágenes para los paquetes (usando placeholders)
  const packageImages = {
    "Paquete 1": "/placeholder.svg?height=300&width=200&text=Paquete+1",
    "Paquete 2": "/placeholder.svg?height=300&width=200&text=Paquete+2",
    "Paquete 3": "/placeholder.svg?height=300&width=200&text=Paquete+3",
    "Paquete 4": "/placeholder.svg?height=300&width=200&text=Paquete+4",
    "Paquete 5": "/placeholder.svg?height=300&width=200&text=Paquete+5",
  };

  // Precios ficticios para los paquetes
  const packagePrices = {
    "Paquete 1": "$99",
    "Paquete 2": "$149",
    "Paquete 3": "$199",
    "Paquete 4": "$249",
    "Paquete 5": "$299",
  };

  // Descripciones ficticias para los paquetes
  const packageDescriptions = {
    "Paquete 1": "Sesión básica",
    "Paquete 2": "Sesión estándar",
    "Paquete 3": "Sesión premium",
    "Paquete 4": "Sesión deluxe",
    "Paquete 5": "Sesión completa",
  };

  // Especialidades ficticias para los fotógrafos
  const photographerSpecialties = {
    Eddy: "Retratos",
    Luisfer: "Bodas",
    "Pacho Velandia": "Eventos",
    Dreivko: "Paisajes",
    Personalizado: "A medida",
  };

  // Colores para efectos de confirmación
  const successColor = "#10b981"; // Verde esmeralda
  const successColorRGB = "16, 185, 129"; // Valores RGB para usar con rgba()

  // Generar número de pedido aleatorio
  const generateOrderNumber = () => {
    const prefix = "FT";
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const suffix =
      String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
      String.fromCharCode(65 + Math.floor(Math.random() * 26));
    return `${prefix}-${randomNum}-${suffix}`;
  };

  const canProceedToStep = (step: number) => {
    switch (step) {
      case 1:
        return true;
      case 2:
        return selectedPhotographer !== null;
      case 3:
        return selectedPhotographer !== null && selectedPackage !== null;
      case 4:
        return (
          selectedPhotographer !== null &&
          selectedPackage !== null &&
          paymentMethod !== null
        );
      case 5:
        return isConfirmed;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (canProceedToStep(currentStep + 1)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirm = () => {
    setIsConfirmed(true);
    setOrderNumber(generateOrderNumber());
    setCurrentStep(5);
    setShowConfirmation(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
        duration: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 0px 20px rgba(255,255,255,0.2)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.97,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 10,
      },
    },
    selected: {
      scale: 1,
      boxShadow: `0px 0px 30px rgba(${successColorRGB}, 0.4)`,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25,
      },
    },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.2 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  // Añadir estas nuevas variantes de animación después de overlayVariants
  const glowEffect = {
    boxShadow: `0 0 15px rgba(${successColorRGB}, 0.5), 0 0 30px rgba(${successColorRGB}, 0.3), inset 0 0 10px rgba(${successColorRGB}, 0.1)`,
  };

  // Variantes para animaciones de títulos
  const titleIconVariants = {
    initial: { y: -20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  };

  const titleTextVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 flex flex-col items-center justify-center font-light">
      <div className="w-full max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {currentStep >= 1 && (
            <motion.div
              key="step1"
              initial={currentStep === 1 ? "hidden" : "visible"}
              animate="visible"
              exit="exit"
              variants={containerVariants}
              className="space-y-4"
            >
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-[#10b981]/40 to-transparent my-8"
                variants={itemVariants}
              />
              <motion.div
                variants={itemVariants}
                className="relative flex flex-col items-center justify-center mb-8 mt-6"
              >
                <div className="w-full max-w-md relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#10b981]/0 via-[#10b981]/20 to-[#10b981]/0 blur-md transform -skew-y-3" />
                  <div className="flex items-center justify-center gap-3 py-3 relative">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      }}
                      className="bg-gradient-to-br from-[#10b981]/80 to-[#10b981]/20 rounded-full p-2 flex-shrink-0 shadow-lg shadow-[#10b981]/20"
                    >
                      <Camera className="w-6 h-6 text-white" />
                    </motion.div>
                    <h2 className="text-2xl font-bold uppercase tracking-wider text-center text-transparent bg-clip-text bg-gradient-to-r from-white via-[#10b981] to-white">
                      SELECCIONE EL FOTÓGRAFO
                    </h2>
                  </div>
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "120px" }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="h-1 bg-[#10b981] rounded-full mt-1"
                />
              </motion.div>
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-[#10b981]/40 to-transparent mb-8"
                variants={itemVariants}
              />

              <motion.div
                variants={itemVariants}
                className="grid grid-cols-5 gap-4"
              >
                {photographers.map((photographer) => (
                  <motion.div
                    key={photographer}
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                    animate={
                      selectedPhotographer === photographer
                        ? "selected"
                        : "visible"
                    }
                    onClick={() => setSelectedPhotographer(photographer)}
                    className={`border rounded-md flex flex-col items-center justify-end cursor-pointer overflow-hidden h-72 relative group ${
                      selectedPhotographer === photographer
                        ? "border-2 bg-white/5"
                        : "border-white/30 hover:border-white/60"
                    }`}
                    style={
                      selectedPhotographer === photographer
                        ? { ...glowEffect, borderColor: successColor }
                        : {}
                    }
                  >
                    {/* Imagen de fondo */}
                    <div className="absolute inset-0 w-full h-full">
                      <img
                        src={
                          photographerImages[
                            photographer as keyof typeof photographerImages
                          ] || "/placeholder.svg"
                        }
                        alt={photographer}
                        className="object-cover"
                      />
                      {/* Overlay para mejorar legibilidad del texto */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30 ${
                          selectedPhotographer === photographer
                            ? "opacity-70"
                            : "opacity-80"
                        }`}
                      />
                    </div>

                    <div className="relative z-10 p-3 text-center w-full bg-black/50 backdrop-blur-sm">
                      <span className="text-base font-medium">
                        {photographer}
                      </span>
                      <span className="text-xs text-white/80 block mt-1">
                        {
                          photographerSpecialties[
                            photographer as keyof typeof photographerSpecialties
                          ]
                        }
                      </span>
                    </div>

                    {selectedPhotographer === photographer && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute top-2 right-2 bg-[#10b981] text-white rounded-full p-0.5 z-20"
                      >
                        <CheckCircle size={16} />
                      </motion.div>
                    )}

                    {/* Efecto de hover y selección */}
                    <motion.div
                      className={`absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        selectedPhotographer === photographer
                          ? `border-2 border-[${successColor}] inset-0`
                          : ""
                      }`}
                      initial={false}
                      animate={{
                        opacity:
                          selectedPhotographer === photographer ? 0.2 : 0,
                        borderColor:
                          selectedPhotographer === photographer
                            ? successColor
                            : "transparent",
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {currentStep >= 2 && canProceedToStep(2) && (
            <motion.div
              key="step2"
              initial={currentStep === 2 ? "hidden" : "visible"}
              animate="visible"
              exit="exit"
              variants={containerVariants}
              className="space-y-4 mt-12"
            >
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-[#10b981]/40 to-transparent my-8"
                variants={itemVariants}
              />
              <motion.div
                variants={itemVariants}
                className="relative flex flex-col items-center justify-center mb-8 mt-6"
              >
                <div className="w-full max-w-md relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#10b981]/0 via-[#10b981]/20 to-[#10b981]/0 blur-md transform -skew-y-3" />
                  <div className="flex items-center justify-center gap-3 py-3 relative">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      }}
                      className="bg-gradient-to-br from-[#10b981]/80 to-[#10b981]/20 rounded-full p-2 flex-shrink-0 shadow-lg shadow-[#10b981]/20"
                    >
                      <Package className="w-6 h-6 text-white" />
                    </motion.div>
                    <h2 className="text-2xl font-bold uppercase tracking-wider text-center text-transparent bg-clip-text bg-gradient-to-r from-white via-[#10b981] to-white">
                      SELECCIONE EL PAQUETE
                    </h2>
                  </div>
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "120px" }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="h-1 bg-[#10b981] rounded-full mt-1"
                />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="grid grid-cols-5 gap-4"
              >
                {packages.map((pkg) => (
                  <motion.div
                    key={pkg}
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                    animate={selectedPackage === pkg ? "selected" : "visible"}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`border rounded-md flex flex-col items-center justify-end cursor-pointer overflow-hidden h-72 relative group ${
                      selectedPackage === pkg
                        ? "border-2 bg-white/5"
                        : "border-white/30 hover:border-white/60"
                    }`}
                    style={
                      selectedPackage === pkg
                        ? { ...glowEffect, borderColor: successColor }
                        : {}
                    }
                  >
                    {/* Imagen de fondo */}
                    <div className="absolute inset-0 w-full h-full">
                      <img
                        src={
                          packageImages[pkg as keyof typeof packageImages] ||
                          "/placeholder.svg"
                        }
                        alt={pkg}
                        className="object-cover"
                      />
                      {/* Overlay para mejorar legibilidad del texto */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30 ${
                          selectedPackage === pkg ? "opacity-70" : "opacity-80"
                        }`}
                      />
                    </div>

                    <div className="relative z-10 p-3 text-center w-full bg-black/50 backdrop-blur-sm">
                      <span className="text-base font-medium">{pkg}</span>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-white/80">
                          {
                            packageDescriptions[
                              pkg as keyof typeof packageDescriptions
                            ]
                          }
                        </span>
                        <span className="text-sm font-medium text-[#10b981]">
                          {packagePrices[pkg as keyof typeof packagePrices]}
                        </span>
                      </div>
                    </div>

                    {selectedPackage === pkg && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute top-2 right-2 bg-[#10b981] text-white rounded-full p-0.5 z-20"
                      >
                        <CheckCircle size={16} />
                      </motion.div>
                    )}

                    {/* Efecto de hover y selección */}
                    <motion.div
                      className={`absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        selectedPackage === pkg
                          ? `border-2 border-[${successColor}] inset-0`
                          : ""
                      }`}
                      initial={false}
                      animate={{
                        opacity: selectedPackage === pkg ? 0.2 : 0,
                        borderColor:
                          selectedPackage === pkg
                            ? successColor
                            : "transparent",
                      }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {currentStep >= 3 && canProceedToStep(3) && (
            <motion.div
              key="step3"
              initial={currentStep === 3 ? "hidden" : "visible"}
              animate="visible"
              exit="exit"
              variants={containerVariants}
              className="space-y-4 mt-12"
            >
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-[#10b981]/40 to-transparent my-8"
                variants={itemVariants}
              />
              <motion.div
                variants={itemVariants}
                className="relative flex flex-col items-center justify-center mb-8 mt-6"
              >
                <div className="w-full max-w-md relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#10b981]/0 via-[#10b981]/20 to-[#10b981]/0 blur-md transform -skew-y-3" />
                  <div className="flex items-center justify-center gap-3 py-3 relative">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      }}
                      className="bg-gradient-to-br from-[#10b981]/80 to-[#10b981]/20 rounded-full p-2 flex-shrink-0 shadow-lg shadow-[#10b981]/20"
                    >
                      <CreditCard className="w-6 h-6 text-white" />
                    </motion.div>
                    <h2 className="text-2xl font-bold uppercase tracking-wider text-center text-transparent bg-clip-text bg-gradient-to-r from-white via-[#10b981] to-white">
                      MÉTODO DE PAGO
                    </h2>
                  </div>
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "120px" }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="h-1 bg-[#10b981] rounded-full mt-1"
                />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="relative mx-auto max-w-md"
              >
                <h3 className="text-[#10b981]/80 text-sm mb-3 text-center">
                  Seleccione su método de pago preferido:
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {paymentMethods.map((method) => {
                    const isSelected = paymentMethod === method;
                    // Asignar iconos según el método de pago
                    let Icon = CreditCard;
                    if (method === "PayPal") Icon = FileText;
                    if (method === "Transferencia bancaria") Icon = FileText;
                    if (method === "Efectivo") Icon = FileText;

                    return (
                      <motion.div
                        key={method}
                        variants={cardVariants}
                        whileHover="hover"
                        whileTap="tap"
                        animate={isSelected ? "selected" : "visible"}
                        onClick={() => setPaymentMethod(method)}
                        className={`border rounded-md p-4 flex flex-col items-center justify-center cursor-pointer gap-3 ${
                          isSelected
                            ? "border-2 bg-white/5 border-[#10b981]"
                            : "border-white/30 hover:border-white/60"
                        }`}
                        style={
                          isSelected
                            ? {
                                boxShadow: `0 0 15px rgba(${successColorRGB}, 0.3)`,
                              }
                            : {}
                        }
                      >
                        <div
                          className={`p-2 rounded-full ${isSelected ? "bg-[#10b981]/20" : "bg-white/5"}`}
                        >
                          <Icon
                            size={20}
                            className={
                              isSelected ? "text-[#10b981]" : "text-white/70"
                            }
                          />
                        </div>
                        <span
                          className={`text-sm ${isSelected ? "text-[#10b981] font-medium" : ""}`}
                        >
                          {method}
                        </span>

                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute top-2 right-2 bg-[#10b981] text-white rounded-full p-0.5"
                          >
                            <CheckCircle size={14} />
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}

          {currentStep >= 4 && canProceedToStep(4) && (
            <motion.div
              key="step4"
              initial={currentStep === 4 ? "hidden" : "visible"}
              animate="visible"
              exit="exit"
              variants={containerVariants}
              className="space-y-4 mt-12"
            >
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-[#10b981]/40 to-transparent my-8"
                variants={itemVariants}
              />
              <motion.div
                variants={itemVariants}
                className="relative flex flex-col items-center justify-center mb-8 mt-6"
              >
                <div className="w-full max-w-md relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#10b981]/0 via-[#10b981]/20 to-[#10b981]/0 blur-md transform -skew-y-3" />
                  <div className="flex items-center justify-center gap-3 py-3 relative">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      }}
                      className="bg-gradient-to-br from-[#10b981]/80 to-[#10b981]/20 rounded-full p-2 flex-shrink-0 shadow-lg shadow-[#10b981]/20"
                    >
                      <CheckCircle className="w-6 h-6 text-white" />
                    </motion.div>
                    <h2 className="text-2xl font-bold uppercase tracking-wider text-center text-transparent bg-clip-text bg-gradient-to-r from-white via-[#10b981] to-white">
                      CONFIRMACIÓN
                    </h2>
                  </div>
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "120px" }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="h-1 bg-[#10b981] rounded-full mt-1"
                />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="border border-white/50 rounded-md p-6 max-w-md mx-auto"
                style={{ boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)" }}
              >
                <div className="space-y-6">
                  <h3 className="text-center text-base">
                    ¿Desea confirmar su pedido?
                  </h3>
                  <div className="flex justify-center gap-4">
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0px 0px 15px rgba(255,255,255,0.2)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="py-2 px-6 border border-white/50 rounded-md text-sm"
                      onClick={() => setCurrentStep(3)}
                    >
                      No
                    </motion.button>
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        boxShadow: `0px 0px 15px rgba(${successColorRGB}, 0.4)`,
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="py-2 px-6 border-2 border-[#10b981] rounded-md text-sm bg-[#10b981]/10 text-[#10b981]"
                      onClick={() => setShowConfirmation(true)}
                    >
                      Sí
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {currentStep === 5 && isConfirmed && (
            <motion.div
              key="step5"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
              className="space-y-4 mt-12"
            >
              <motion.div
                className="h-px bg-gradient-to-r from-transparent via-[#10b981]/70 to-transparent my-6"
                variants={itemVariants}
              />
              <motion.div
                variants={itemVariants}
                className="relative flex flex-col items-center justify-center mb-8 mt-6"
              >
                <div className="w-full max-w-md relative">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-r from-[#10b981]/0 via-[#10b981]/30 to-[#10b981]/0 blur-md transform -skew-y-3"
                  />
                  <div className="flex items-center justify-center gap-3 py-3 relative">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      }}
                      className="bg-gradient-to-br from-[#10b981]/80 to-[#10b981]/20 rounded-full p-2 flex-shrink-0 shadow-lg shadow-[#10b981]/20"
                    >
                      <CheckCircle className="w-6 h-6 text-white" />
                    </motion.div>
                    <h2 className="text-2xl font-bold uppercase tracking-wider text-center text-transparent bg-clip-text bg-gradient-to-r from-white via-[#10b981] to-white">
                      PEDIDO REALIZADO
                    </h2>
                  </div>
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "120px" }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="h-1 bg-[#10b981] rounded-full mt-1"
                />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="text-center space-y-4 max-w-md mx-auto border border-[#10b981]/50 rounded-md p-6"
                style={{ boxShadow: `0 0 30px rgba(${successColorRGB}, 0.15)` }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 10,
                      delay: 0.2,
                    },
                  }}
                  className="w-16 h-16 bg-[#10b981]/20 rounded-full mx-auto flex items-center justify-center"
                  style={{
                    boxShadow: `0 0 20px rgba(${successColorRGB}, 0.3)`,
                  }}
                >
                  <CheckCircle className="w-8 h-8 text-[#10b981]" />
                </motion.div>

                <h3 className="text-xl font-medium mt-4 text-[#10b981]">
                  ¡Gracias por su pedido!
                </h3>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.5, duration: 0.5 },
                  }}
                  className="flex items-center justify-center gap-2 bg-[#10b981]/10 py-2 px-4 rounded-md mx-auto w-fit mt-2 border border-[#10b981]/30"
                >
                  <FileText className="w-4 h-4 text-[#10b981]" />
                  <span className="font-mono font-medium tracking-wider text-[#10b981]">
                    Número de guía: {orderNumber}
                  </span>
                </motion.div>

                <div className="space-y-4 text-left mt-6 border-t border-[#10b981]/20 pt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-20 h-20 relative rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={
                          selectedPhotographer
                            ? photographerImages[
                                selectedPhotographer as keyof typeof photographerImages
                              ]
                            : "/placeholder.svg"
                        }
                        alt={selectedPhotographer || ""}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-white/70 text-sm">Fotógrafo:</span>
                      <p className="font-medium">{selectedPhotographer}</p>
                      <p className="text-xs text-white/60">
                        {selectedPhotographer
                          ? photographerSpecialties[
                              selectedPhotographer as keyof typeof photographerSpecialties
                            ]
                          : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-20 h-20 relative rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={
                          selectedPackage
                            ? packageImages[
                                selectedPackage as keyof typeof packageImages
                              ]
                            : "/placeholder.svg"
                        }
                        alt={selectedPackage || ""}

                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-white/70 text-sm">Paquete:</span>
                      <p className="font-medium">{selectedPackage}</p>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-white/60">
                          {selectedPackage
                            ? packageDescriptions[
                                selectedPackage as keyof typeof packageDescriptions
                              ]
                            : ""}
                        </p>
                        <p className="text-sm font-medium text-[#10b981]">
                          {selectedPackage
                            ? packagePrices[
                                selectedPackage as keyof typeof packagePrices
                              ]
                            : ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-white/60" />
                    <span className="text-white/70">Método de pago:</span>
                    <span className="font-medium">{paymentMethod}</span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-[#10b981]/20">
                    <h4 className="text-[#10b981]/80 text-sm mb-2">
                      Datos del solicitante:
                    </h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="text-white/70">Nombre:</span>{" "}
                        {solicitanteData.nombre}
                      </p>
                      <p>
                        <span className="text-white/70">Email:</span>{" "}
                        {solicitanteData.email}
                      </p>
                      <p>
                        <span className="text-white/70">Teléfono:</span>{" "}
                        {solicitanteData.telefono}
                      </p>
                      <p>
                        <span className="text-white/70">Dirección:</span>{" "}
                        {solicitanteData.direccion}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-white/60 mt-6">
                  Recibirá un correo electrónico con los detalles de su reserva
                  y los próximos pasos a seguir.
                </p>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0px 0px 15px rgba(${successColorRGB}, 0.3)`,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="py-2 px-8 border border-[#10b981] rounded-md text-sm mt-6 mx-auto bg-[#10b981]/10 text-[#10b981]"
                  onClick={() => {
                    setCurrentStep(1);
                    setSelectedPhotographer(null);
                    setSelectedPackage(null);
                    setPaymentMethod(null);
                    setIsConfirmed(false);
                    setOrderNumber("");
                  }}
                >
                  Realizar otra reserva
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {currentStep < 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center gap-4 mt-16"
          >
            {currentStep > 1 && (
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 0px 15px rgba(255,255,255,0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                className="py-3 px-8 border border-white/30 rounded-md text-sm font-medium relative overflow-hidden group bg-white/5 text-white"
                onClick={handlePrevious}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <ArrowLeft size={16} />
                  Atrás
                </span>
              </motion.button>
            )}

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: canProceedToStep(currentStep + 1)
                  ? `0px 0px 20px rgba(${successColorRGB}, 0.4)`
                  : "0px 0px 15px rgba(255,255,255,0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              className={`py-3 px-12 rounded-md text-sm font-medium relative overflow-hidden group ${
                canProceedToStep(currentStep + 1)
                  ? "border-[#10b981] bg-gradient-to-r from-[#10b981]/80 to-[#10b981]/60 text-white"
                  : "border border-white/30 bg-white/5 text-white/50 opacity-50 cursor-not-allowed"
              }`}
              onClick={handleNext}
              disabled={!canProceedToStep(currentStep + 1)}
            >
              {canProceedToStep(currentStep + 1) && (
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-[#10b981]/0 via-white/20 to-[#10b981]/0"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 1.5,
                    ease: "linear",
                  }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                Continuar
                {canProceedToStep(currentStep + 1) && (
                  <motion.span
                    initial={{ x: -5, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    →
                  </motion.span>
                )}
              </span>
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Modal de confirmación - Ahora perfectamente centrado */}
      <AnimatePresence>
        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={overlayVariants}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowConfirmation(false)}
            />

            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVariants}
              className="bg-black border border-[#10b981]/30 rounded-md p-6 z-50 w-full max-w-md relative"
              style={{ boxShadow: `0 0 30px rgba(${successColorRGB}, 0.2)` }}
            >
              <div className="absolute top-3 right-3">
                <button
                type="button"
                  onClick={() => setShowConfirmation(false)}
                  className="text-white/70 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <h3 className="text-xl font-medium text-center mb-6 text-[#10b981]">
                Confirmar Pedido
              </h3>

              <div className="space-y-6">
                {/* Datos del pedido */}
                <div className="space-y-4 mb-2">
                  <div className="flex items-start gap-3 border-b border-[#10b981]/10 pb-4">
                    <div className="w-20 h-20 relative rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={
                          selectedPhotographer
                            ? photographerImages[
                                selectedPhotographer as keyof typeof photographerImages
                              ]
                            : "/placeholder.svg"
                        }
                        alt={selectedPhotographer || ""}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-[#10b981]/80 text-sm">
                        Fotógrafo seleccionado:
                      </h4>
                      <p className="font-medium">{selectedPhotographer}</p>
                      <p className="text-xs text-white/60">
                        Especialidad:{" "}
                        {selectedPhotographer
                          ? photographerSpecialties[
                              selectedPhotographer as keyof typeof photographerSpecialties
                            ]
                          : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 border-b border-[#10b981]/10 pb-4">
                    <div className="w-20 h-20 relative rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={
                          selectedPackage
                            ? packageImages[
                                selectedPackage as keyof typeof packageImages
                              ]
                            : "/placeholder.svg"
                        }
                        alt={selectedPackage || ""}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-[#10b981]/80 text-sm">
                        Paquete seleccionado:
                      </h4>
                      <p className="font-medium">{selectedPackage}</p>
                      <p className="text-xs text-white/60">
                        {selectedPackage
                          ? packageDescriptions[
                              selectedPackage as keyof typeof packageDescriptions
                            ]
                          : ""}
                      </p>
                      <p className="text-sm font-medium text-[#10b981]">
                        {selectedPackage
                          ? packagePrices[
                              selectedPackage as keyof typeof packagePrices
                            ]
                          : ""}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 border-b border-[#10b981]/10 pb-4">
                    <h4 className="text-[#10b981]/80 text-sm">
                      Método de pago:
                    </h4>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#10b981]/60" />
                      <p className="font-medium">{paymentMethod}</p>
                    </div>
                  </div>
                </div>

                {/* Datos del solicitante (solo visualización) */}
                <div className="space-y-3 bg-black/30 rounded-md p-4 border border-[#10b981]/20">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-[#10b981]" />
                    <h4 className="text-[#10b981] text-base font-medium">
                      Datos del solicitante
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-white/70">Nombre:</p>
                      <p className="font-medium">{solicitanteData.nombre}</p>
                    </div>
                    <div>
                      <p className="text-white/70">Email:</p>
                      <p className="font-medium">{solicitanteData.email}</p>
                    </div>
                    <div>
                      <p className="text-white/70">Teléfono:</p>
                      <p className="font-medium">{solicitanteData.telefono}</p>
                    </div>
                    <div>
                      <p className="text-white/70">Dirección:</p>
                      <p className="font-medium">{solicitanteData.direccion}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="py-2 px-6 border border-white/50 rounded-md text-sm"
                  onClick={() => setShowConfirmation(false)}
                >
                  Cancelar
                </motion.button>
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0px 0px 15px rgba(${successColorRGB}, 0.3)`,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="py-2 px-6 border border-[#10b981] rounded-md text-sm bg-[#10b981]/10 text-[#10b981]"
                  onClick={handleConfirm}
                >
                  Confirmar
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
