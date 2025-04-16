'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Facebook, Github, Mail, ChevronDown, Check, X } from 'lucide-react';
import { SocialButton } from './social-button';
import { US, MX, ES, CO, AR, CL, PE, VE, EC, GT, SV, HN, NI, CR, PA, BO, PY, UY, CU, DO, BR, PT } from 'country-flag-icons/react/3x2';

const countryCodes = [
  { code: '+1', country: 'Estados Unidos', flag: US },
  { code: '+52', country: 'México', flag: MX },
  { code: '+34', country: 'España', flag: ES },
  { code: '+57', country: 'Colombia', flag: CO },
  { code: '+54', country: 'Argentina', flag: AR },
  { code: '+56', country: 'Chile', flag: CL },
  { code: '+51', country: 'Perú', flag: PE },
  { code: '+58', country: 'Venezuela', flag: VE },
  { code: '+593', country: 'Ecuador', flag: EC },
  { code: '+502', country: 'Guatemala', flag: GT },
  { code: '+503', country: 'El Salvador', flag: SV },
  { code: '+504', country: 'Honduras', flag: HN },
  { code: '+505', country: 'Nicaragua', flag: NI },
  { code: '+506', country: 'Costa Rica', flag: CR },
  { code: '+507', country: 'Panamá', flag: PA },
  { code: '+591', country: 'Bolivia', flag: BO },
  { code: '+595', country: 'Paraguay', flag: PY },
  { code: '+598', country: 'Uruguay', flag: UY },
  { code: '+53', country: 'Cuba', flag: CU },
  { code: '+1', country: 'República Dominicana', flag: DO },
  { code: '+55', country: 'Brasil', flag: BR },
  { code: '+351', country: 'Portugal', flag: PT },
];

export const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [countryCode, setCountryCode] = useState('+52');
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[1]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
  const [isPhoneValid, setIsPhoneValid] = useState<boolean | null>(null);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean | null>(null);
  const [isNameValid, setIsNameValid] = useState<boolean | null>(null);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    return phone.length >= 8 && /^\d+$/.test(phone);
  };

  const validatePassword = (pass: string) => {
    return pass.length >= 8;
  };

  const validateName = (name: string) => {
    return name.length >= 3 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (newEmail) {
      setIsEmailValid(validateEmail(newEmail));
    } else {
      setIsEmailValid(null);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value;
    setPhoneNumber(newPhone);
    if (newPhone) {
      setIsPhoneValid(validatePhone(newPhone));
    } else {
      setIsPhoneValid(null);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    if (newName) {
      setIsNameValid(validateName(newName));
    } else {
      setIsNameValid(null);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (newPassword) {
      setIsPasswordValid(validatePassword(newPassword));
    } else {
      setIsPasswordValid(null);
    }
  };

  const selectCountry = (country: typeof countryCodes[0]) => {
    setCountryCode(country.code);
    setSelectedCountry(country);
    setShowCountryDropdown(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    console.log('Registrarse con:', { name, email, password, agreeToTerms, phone: `${countryCode}${phoneNumber}` });
  };

  const inputVariants = {
    focus: { scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } },
    blur: { scale: 1 }
  };

  const validationIconVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 20 } }
  };

  const ValidationIcon = ({ isValid }: { isValid: boolean }) => (
    <div className="absolute right-3 inset-y-0 flex items-center pointer-events-none">
      <motion.div
        variants={validationIconVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center justify-center w-5 h-5"
      >
        {isValid ? (
          <Check className="w-5 h-5 text-green-500" strokeWidth={2.5} />
        ) : (
          <X className="w-5 h-5 text-red-500" strokeWidth={2.5} />
        )}
      </motion.div>
    </div>
  );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { staggerChildren: 0.1 }
        }
      }}
      className="space-y-4"
    >
      <motion.h2 
        className="text-xl font-bold text-center text-gray-800 mb-4"
        variants={inputVariants}
      >
        Crear una Cuenta
      </motion.h2>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <motion.div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre Completo
          </label>
          <div className="relative">
            <motion.input
              id="name"
              type="text"
              value={name}
              onChange={handleNameChange}
              className={`w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${
                isNameValid === true ? 'border-green-500 focus:ring-green-500' :
                isNameValid === false ? 'border-red-500 focus:ring-red-500' :
                'border-gray-300 focus:ring-indigo-500'
              } pr-10`}
              placeholder="Juan Pérez"
              required
              whileFocus="focus"
              whileTap="focus"
              variants={inputVariants}
            />
            {isNameValid !== null && <ValidationIcon isValid={isNameValid} />}
          </div>
        </motion.div>
        
        <motion.div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Correo Electrónico
          </label>
          <div className="relative">
            <motion.input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              className={`w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${
                isEmailValid === true ? 'border-green-500 focus:ring-green-500' :
                isEmailValid === false ? 'border-red-500 focus:ring-red-500' :
                'border-gray-300 focus:ring-indigo-500'
              } pr-10`}
              placeholder="tu@correo.com"
              required
              whileFocus="focus"
              whileTap="focus"
              variants={inputVariants}
            />
            {isEmailValid !== null && <ValidationIcon isValid={isEmailValid} />}
          </div>
        </motion.div>

        <motion.div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Teléfono Móvil
          </label>
          <div className="flex gap-2">
            <motion.div className="relative">
              <motion.button
                type="button"
                className="flex items-center h-[42px] px-3 border border-gray-300 rounded-full bg-gray-50 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="w-6 h-4">
                  {selectedCountry.flag && React.createElement(selectedCountry.flag)}
                </span>
                <ChevronDown className="h-4 w-4 ml-1 text-gray-400" />
              </motion.button>
              
              {showCountryDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-10 mt-1 w-52 bg-white shadow-lg max-h-48 rounded-xl py-1 text-sm overflow-auto focus:outline-hidden border border-gray-200"
                >
                  {countryCodes.map((country) => (
                    <motion.button
                      key={`${country.code}-${country.country}`}
                      type="button"
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2"
                      onClick={() => selectCountry(country)}
                      whileHover={{ backgroundColor: "#f3f4f6" }}
                    >
                      <span className="w-6 h-4 shrink-0">
                        {country.flag && React.createElement(country.flag)}
                      </span>
                      <span className="flex-1 truncate">{country.country}</span>
                      <span className="text-gray-500 text-xs">{country.code}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </motion.div>
            <div className="relative flex-1">
              <motion.input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                className={`w-full pl-16 pr-10 py-2 border rounded-full focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${
                  isPhoneValid === true ? 'border-green-500 focus:ring-green-500' :
                  isPhoneValid === false ? 'border-red-500 focus:ring-red-500' :
                  'border-gray-300 focus:ring-indigo-500'
                }`}
                placeholder="123456789"
                required
                whileFocus="focus"
                whileTap="focus"
                variants={inputVariants}
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                {selectedCountry.code}
              </span>
              {isPhoneValid !== null && <ValidationIcon isValid={isPhoneValid} />}
            </div>
          </div>
        </motion.div>
        
        <motion.div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <div className="relative">
            <motion.input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              className={`w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${
                isPasswordValid === true ? 'border-green-500 focus:ring-green-500' :
                isPasswordValid === false ? 'border-red-500 focus:ring-red-500' :
                'border-gray-300 focus:ring-indigo-500'
              } pr-20`}
              placeholder="••••••••"
              required
              whileFocus="focus"
              whileTap="focus"
              variants={inputVariants}
            />
            {isPasswordValid !== null && (
              <div className="absolute right-10 inset-y-0 flex items-center pointer-events-none">
                <motion.div
                  variants={validationIconVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex items-center justify-center w-5 h-5"
                >
                  {isPasswordValid ? (
                    <Check className="w-5 h-5 text-green-500" strokeWidth={2.5} />
                  ) : (
                    <X className="w-5 h-5 text-red-500" strokeWidth={2.5} />
                  )}
                </motion.div>
              </div>
            )}
            <button
              type="button"
              className="absolute right-3 inset-y-0 flex items-center justify-center text-gray-400 hover:text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" strokeWidth={2} />
              ) : (
                <Eye className="w-5 h-5" strokeWidth={2} />
              )}
            </button>
          </div>
        </motion.div>
        
        <motion.div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
            Confirmar Contraseña
          </label>
          <div className="relative">
            <motion.input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${
                confirmPassword && password === confirmPassword ? 'border-green-500 focus:ring-green-500' :
                confirmPassword ? 'border-red-500 focus:ring-red-500' :
                'border-gray-300 focus:ring-indigo-500'
              } pr-20`}
              placeholder="••••••••"
              required
              whileFocus="focus"
              whileTap="focus"
              variants={inputVariants}
            />
            {confirmPassword && (
              <div className="absolute right-10 inset-y-0 flex items-center pointer-events-none">
                <motion.div
                  variants={validationIconVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex items-center justify-center w-5 h-5"
                >
                  {password === confirmPassword ? (
                    <Check className="w-5 h-5 text-green-500" strokeWidth={2.5} />
                  ) : (
                    <X className="w-5 h-5 text-red-500" strokeWidth={2.5} />
                  )}
                </motion.div>
              </div>
            )}
            <button
              type="button"
              className="absolute right-3 inset-y-0 flex items-center justify-center text-gray-400 hover:text-gray-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" strokeWidth={2} />
              ) : (
                <Eye className="w-5 h-5" strokeWidth={2} />
              )}
            </button>
          </div>
        </motion.div>
        
        <motion.div className="flex items-center">
          <motion.input
            id="agree-terms"
            type="checkbox"
            checked={agreeToTerms}
            onChange={() => setAgreeToTerms(!agreeToTerms)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
          <label htmlFor="agree-terms" className="ml-2 block text-xs text-gray-700">
            Acepto los <a href="/" className="text-indigo-600 hover:text-indigo-500">Términos</a> y la <a href="/" className="text-indigo-600 hover:text-indigo-500">Política de Privacidad</a>
          </label>
        </motion.div>
        
        <motion.button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors text-sm"
          whileHover={{ scale: 1.02, backgroundColor: "#4338ca" }}
          whileTap={{ scale: 0.98 }}
          disabled={!agreeToTerms}
        >
          Registrarse
        </motion.button>
      </form>
      
      <motion.div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"/>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-white text-gray-500">O registrarse con</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-center gap-4">
          <SocialButton icon={<Github className="h-4 w-4" />} onClick={() => console.log('Registrarse con GitHub')} />
          <SocialButton icon={<Facebook className="h-4 w-4" />} onClick={() => console.log('Registrarse con Facebook')} />
          <SocialButton icon={<Mail className="h-4 w-4" />} onClick={() => console.log('Registrarse con Google')} />
        </div>
      </motion.div>
    </motion.div>
  );
};