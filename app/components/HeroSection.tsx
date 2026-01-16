import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight, Shield, Award, ThumbsUp } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden hero-gradient">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-navy-800/30 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-navy-700/20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                <Award className="w-4 h-4" />
                Líderes en Seminuevos desde 1978
              </span>
            </motion.div>

            <motion.h1
              className="heading-xl mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Tu próximo auto
              <br />
              <span className="text-navy-200">te espera aquí</span>
            </motion.h1>

            <motion.p
              className="text-xl text-navy-200 mb-8 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Encuentra el auto seminuevo perfecto con la garantía y confianza
              que solo AMSA puede ofrecerte. Más de 45 años de experiencia nos
              respaldan.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link
                to="/inventario"
                className="btn-secondary bg-white text-navy-900 flex items-center gap-2"
              >
                Ver Inventario
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contacto"
                className="btn-ghost text-white border border-white/30 hover:bg-white/10"
              >
                Contactar
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              className="flex flex-wrap gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {[
                { icon: Shield, label: "Garantía Incluida" },
                { icon: Award, label: "Certificados" },
                { icon: ThumbsUp, label: "Financiamiento" },
              ].map((badge, index) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 text-navy-200"
                >
                  <badge.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{badge.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero image / Car showcase */}
          <motion.div
            className="hidden lg:block relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              {/* Glowing backdrop */}
              <div className="absolute inset-0 bg-gradient-to-r from-navy-700/50 to-navy-600/50 blur-3xl rounded-full scale-90" />

              {/* Car image placeholder - in production, replace with actual car image */}
              <div className="relative bg-gradient-to-br from-navy-800/50 to-navy-900/50 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
                <div className="aspect-[16/10] rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80"
                    alt="Luxury car"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating stats */}
                <motion.div
                  className="absolute -left-4 top-1/4 bg-white rounded-2xl p-4 shadow-2xl"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <p className="text-3xl font-bold text-navy-900">45+</p>
                  <p className="text-sm text-navy-500">Años de experiencia</p>
                </motion.div>

                <motion.div
                  className="absolute -right-4 bottom-1/4 bg-white rounded-2xl p-4 shadow-2xl"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                >
                  <p className="text-3xl font-bold text-navy-900">500+</p>
                  <p className="text-sm text-navy-500">Autos vendidos/año</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
