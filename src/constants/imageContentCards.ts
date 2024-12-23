interface IImageTextCard {
   title : string,
   content : string,
   imageUrl : string,
   altImg : string
}


export const saludGeneralCard : IImageTextCard = {
   title :"Salud General",
   content :  `Asegúrate de incluir frutas, verduras, proteínas y granos enteros
   en tus comidas diarias para obtener los nutrientes necesarios. La hidratación 
   es fundamental, por lo que se recomienda beber al menos 2 litros de agua al día. 
   Además, realizar al menos 30 minutos de actividad física regularmente ayuda 
   a fortalecer el corazón y mejorar la salud en general. No subestimes la 
   importancia del descanso: dormir entre 7 y 8 horas cada noche es esencial 
   para una buena recuperación física y mental. Finalmente, reduce el consumo 
   excesivo de sal y azúcar para prevenir enfermedades como la hipertensión 
   y la diabetes.`,
   imageUrl: "/images/kidsPark.jpg",
   altImg:"Salud General"

}


export const saludMentalCard: IImageTextCard = {
   title: "Salud Mental",
   content: `Tu bienestar emocional es tan importante como tu salud física. Dedica tiempo 
     a ti mismo realizando actividades que disfrutes y te relajen. Mantén el contacto 
     con tus amigos y familiares, ya que una buena red de apoyo puede ser clave en 
     momentos difíciles. Practicar meditación o mindfulness puede ayudarte a reducir 
     el estrés y mejorar tu concentración. Si sientes que las cosas se vuelven abrumadoras, 
     no dudes en buscar ayuda profesional. Además, establece límites claros en el trabajo 
     y haz pausas regulares para evitar el agotamiento mental.`,
   imageUrl: "/images/meditar.jpg",
   altImg: "Salud Mental",
 };
 
 export const pevenciónMedicaCard: IImageTextCard = {
   title: "Prevención Médica",
   content: `La prevención es una herramienta poderosa para cuidar tu salud. Realiza chequeos 
     médicos periódicos para detectar posibles problemas a tiempo. Asegúrate de mantener 
     al día tu calendario de vacunación y no olvides la importancia de realizar 
     autoexámenes regulares para detectar signos tempranos de enfermedades. Además, 
     proteger tu piel del sol con protector solar es esencial para prevenir daños 
     a largo plazo. Por último, reducir o eliminar el consumo de tabaco y moderar el alcohol 
     son hábitos que disminuyen significativamente el riesgo de desarrollar enfermedades crónicas.`,
   imageUrl: "/images/womenRun.jpg",
   altImg: "Prevención Médica",
 };
 
 export const habitosSaludablesCard: IImageTextCard = {
   title: "Hábitos Saludables",
   content: `Los pequeños hábitos diarios pueden generar grandes cambios en tu calidad de vida. 
     Evita el sedentarismo levantándote y moviéndote cada hora si trabajas sentado por 
     largos períodos. Practicar una buena higiene personal, como lavarse las manos con frecuencia, 
     es una medida simple pero efectiva para prevenir enfermedades. Mantén una postura adecuada 
     al sentarte para evitar dolores de espalda y procura reducir el tiempo frente a las pantallas, 
     especialmente antes de dormir. Incorporar estas rutinas de manera constante te ayudará a 
     sentirte mejor física y mentalmente.`,
   imageUrl: "/images/doctor.jpg",
   altImg: "Hábitos Saludables",
 };