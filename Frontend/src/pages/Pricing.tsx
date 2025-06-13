import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Check, Zap, Crown, Rocket, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Free",
      description: "Perfect for getting started",
      monthlyPrice: 0,
      yearlyPrice: 0,
      icon: Zap,
      color: "from-green-500 to-emerald-500",
      features: [
        "5 PDF uploads per month",
        "Basic AI summaries",
        "Image text extraction",
        "Standard processing speed",
        "Community support",
      ],
      limitations: ["Limited to 10MB file size", "Basic analysis only"],
    },
    {
      name: "Pro",
      description: "For professionals and teams",
      monthlyPrice: 19,
      yearlyPrice: 15,
      icon: Crown,
      color: "from-purple-500 to-pink-500",
      popular: true,
      features: [
        "Unlimited PDF uploads",
        "Advanced AI analysis",
        "OCR for all image types",
        "Priority processing",
        "Link intelligence",
        "Code snippet storage",
        "Export to multiple formats",
        "Email support",
      ],
      limitations: [],
    },
    {
      name: "Enterprise",
      description: "For large organizations",
      monthlyPrice: 49,
      yearlyPrice: 39,
      icon: Rocket,
      color: "from-blue-500 to-cyan-500",
      features: [
        "Everything in Pro",
        "API access",
        "Custom integrations",
        "White-label options",
        "Advanced analytics",
        "Team management",
        "Custom AI models",
        "Dedicated support",
        "SLA guarantee",
      ],
      limitations: [],
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />

      <div className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Flexible
              </span>{" "}
              Pricing for Every Learner
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Choose the perfect plan for your learning journey. Switch anytime
              as your needs evolve.
            </motion.p>

            {/* Billing Toggle */}
            <motion.div
              className="flex items-center justify-center gap-4 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span
                className={`text-lg font-medium ${
                  !isYearly ? "text-gray-900 dark:text-white" : "text-gray-500"
                }`}
              >
                Monthly
              </span>
              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
                className="data-[state=checked]:bg-purple-600 h-6 w-11"
              />
              <span
                className={`text-lg font-medium ${
                  isYearly ? "text-gray-900 dark:text-white" : "text-gray-500"
                }`}
              >
                Yearly
              </span>
              <Badge
                variant="secondary"
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-3 py-1 text-sm"
              >
                Save 20%
              </Badge>
            </motion.div>
          </motion.div>

          {/* Pricing Cards */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                variants={item}
                className={`relative ${plan.popular ? "md:-mt-4 md:mb-4" : ""}`}
                whileHover={{ y: -5 }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-0 right-0 text-center">
                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1.5 text-sm font-semibold shadow-lg">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <Card
                  className={`h-full border-2 transition-all duration-300 hover:shadow-xl dark:border-gray-700 ${
                    plan.popular
                      ? "border-purple-200 dark:border-purple-900 shadow-lg"
                      : "border-gray-200 hover:border-purple-200"
                  }`}
                >
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4 shadow-md`}
                    >
                      <plan.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold dark:text-white">
                      {plan.name}
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* Price */}
                    <div className="text-center mb-8">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">
                          ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">
                          /{isYearly ? "month" : "month"}
                        </span>
                      </div>
                      {isYearly && plan.monthlyPrice > 0 && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Billed annually (${plan.yearlyPrice * 12}/year)
                        </p>
                      )}
                    </div>

                    {/* Features */}
                    <div className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-start gap-3"
                        >
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Limitations */}
                    {plan.limitations.length > 0 && (
                      <div className="mb-6">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                          LIMITATIONS
                        </p>
                        <div className="space-y-2">
                          {plan.limitations.map((limitation, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                •
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {limitation}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CTA Button */}
                    <Button
                      className={`w-full group ${
                        plan.popular
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                          : "bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
                      }`}
                    >
                      {plan.name === "Free"
                        ? "Get Started"
                        : `Choose ${plan.name}`}
                      <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-24 text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              Everything you need to know about StudySync plans and billing
            </p>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left"
            >
              {[
                {
                  question: "Can I change plans anytime?",
                  answer:
                    "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
                },
                {
                  question: "Is there a free trial?",
                  answer:
                    "Our Free plan lets you try all basic features. Pro and Enterprise plans come with a 14-day free trial.",
                },
                {
                  question: "What payment methods do you accept?",
                  answer:
                    "We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.",
                },
                {
                  question: "Do you offer refunds?",
                  answer:
                    "Yes, we offer a 30-day money-back guarantee for all paid plans if you're not satisfied.",
                },
                {
                  question: "Can I cancel anytime?",
                  answer:
                    "Absolutely. You can cancel your subscription at any time with no hidden fees.",
                },
                {
                  question: "Is my data safe?",
                  answer:
                    "We use enterprise-grade security and encryption to protect all your documents and data.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-900 transition-colors"
                >
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
