//
//         Copyright (c) NiazeRooz.  All rights reserved. 
//

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

//
//      It is maybe Used For any class (View, Partial, ...) then
//      Add To Global System namespace (No Need Add reference in class header...)
//
namespace System
{
    /// <summary>
    /// 
    ///     All Type Conversion Helper Extension
    ///     Use Communication System to Convert Two objcet Together
    ///     
    /// 
    /// </summary>
    public static class ConverterExtensions
    {

        public static T CreateNewInstance<T>(this T t)
        {
            var typ = typeof(T);
            var k = (typ.Assembly.CreateInstance(typ.FullName));

            foreach (var p in typ.GetProperties())
            {
                if (p.CanWrite)
                    p.SetValue(k, p.GetValue(t));
            }

            return (T)k;
        }

        public static T CreateNewInstanceFromType<T>(this Type t)
        {
            var k = (t.Assembly.CreateInstance(t.FullName));
  
            return (T)k;
        }

        public static bool Is<T>(this object o, T targetTypeDefault)
        {
            if (o == null) return false;

            try
            {
                if (!o.To<T>(targetTypeDefault).Equals(targetTypeDefault))
                {
                    return true;
                }

            }
            catch
            {
            }

            return false;

        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="o"></param>
        /// <param name="targetTypeDefault"></param>
        /// <returns></returns>
        public static T To<T>(this object o, T targetTypeDefault, Type custemFinalType = null)
        {
            if (o == null) return targetTypeDefault;

            if ((typeof(T) == typeof(CommunicationBase) || typeof(T) == typeof(ICommunication)) && (o.GetType() == typeof(ICommunication) || o.GetType() == typeof(CommunicationBase)))
            {
                return (T)o;
            }

            if (o.GetType() == typeof(ICommunication) || o.GetType() == typeof(CommunicationBase))
                return ConvertIComImpelementerTo<T>(o, targetTypeDefault, custemFinalType);

            Converter converter = new Converter(o, targetTypeDefault);
            return ConvertNonIComImpelementerTo<T>(o, converter, targetTypeDefault, custemFinalType);
        }

        public static object ToCurrentType(this object o)
        {

            return o.ToCurrentType<object>(null);
        }

        public static object ToCurrentType<T>(this object o, T recommendation)
        {
            if (o == null) return null;

            if (recommendation != null && recommendation.GetType() != typeof(object))
            {
                if (o.GetType() == recommendation.GetType() || o.GetType() == typeof(string))
                    return (object)(o.To<T>(recommendation));
            }

            object r = null;

            if (o.ToString().Trim() == "") return "";

            if (o.Is<bool>(false)) r = o.To<bool>(false);
            else if (o.Is<byte>(byte.MinValue)) r = o.To<byte>(0);
            else if (o.Is<Int16>(Int16.MinValue)) r = o.To<Int16>(0);
            else if (o.Is<int>(int.MinValue)) r = o.To<int>(0);
            else if (o.Is<long>(long.MinValue)) r = o.To<long>(0);
            else if (o.Is<Single>(Single.MinValue)) r = o.To<Single>(0);
            else if (o.Is<float>(float.MinValue)) r = o.To<float>(0.0f);
            else if (o.Is<double>(double.MinValue)) r = o.To<double>(0.0);
            else if (o.Is<decimal>(decimal.MinValue)) r = o.To<decimal>(0.0m);

            else if (o.Is<DateTime>(new DateTime())) r = o.To<DateTime>(new DateTime());
            else if (o.Is<Guid>(new Guid())) r = o.To<Guid>(new Guid());

            else if (o.Is<string>("") && o.ToString() == "False") return false;
            else if (o.Is<string>("") && o.ToString() == "True") return true;

            else if (o.Is<string>("")) r = o.To<string>("");

            else r = (object)o;

            return r;
        }

        private static T ConvertNonIComImpelementerTo<T>(object mainInstance, Converter converter, T targetTypeDefault, Type custemFinalType = null)
        {
            if (typeof(T) == typeof(bool)) return (T)(object)converter.BooleanValue;
            if (typeof(T) == typeof(byte)) return (T)(object)converter.ByteValue;
            if (typeof(T) == typeof(int)) return (T)(object)converter.IntegerValue;
            if (typeof(T) == typeof(long)) return (T)(object)converter.LongValue;
            if (typeof(T) == typeof(Single)) return (T)(object)converter.SingleValue;
            if (typeof(T) == typeof(float)) return (T)(object)converter.FloatValue;
            if (typeof(T) == typeof(double)) return (T)(object)converter.DoubleValue;
            if (typeof(T) == typeof(DateTime)) return (T)(object)converter.DateTimeValue;
            if (typeof(T) == typeof(Guid)) return (T)(object)converter.GuidValue;
            if (typeof(T) == typeof(string)) return (T)(object)converter.StringValue;
            if (typeof(T) == typeof(ICommunication) || typeof(T) == typeof(CommunicationBase)) return (T)(object)converter.CommunicationValue(custemFinalType);

            return ConvertSourceToDestination<T>(mainInstance, targetTypeDefault);
        }

        private static T ConvertIComImpelementerTo<T>(object mainInstance, T targetTypeDefault, Type custemFinalType = null)
        {
            if (typeof(T) == typeof(ICommunication)) return (T)(object)mainInstance;

            if (Converter.IsOfExclusiveTypes(typeof(T)))
                return (T)(object)((CommunicationBase)mainInstance).Value.To<T>(targetTypeDefault);

            var val = Converter.PopulateRespectiveObjectValue((CommunicationBase)mainInstance, targetTypeDefault);

            return (T)val;
        }

        private static T ConvertSourceToDestination<T>(object source, T destination)
        {
            return source.To<ICommunication>(new CommunicationBase(), typeof(T)).To<T>(destination);
        }

        public static String ToJson<T>(this T t, bool attachEmpty = true, bool useQuotationForString = false)
        {
            var com = t.To<CommunicationBase>(new CommunicationBase());
            return com.ToString(attachEmpty, useQuotationForString);
        }

        public static T JsonTo<T>(this string s, T targetTypeDefault )
        {
            var jDic = new JsonDictionaryConverter(s);

            var com = new CommunicationBase();

            foreach (var p in jDic.Dictionary.Keys)
            {
                /*
                 Get Deeper Level From string Result
                 */

                var val = jDic.Dictionary[p].StringValue;

                var newCom = new CommunicationBase() { Name = p, Value = val.ToCurrentType() };

                var jDic2 = new JsonDictionaryConverter(jDic.Dictionary[p].StringValue);

                if (jDic2.Dictionary != null && jDic2.Dictionary.Count > 0)
                {
                    newCom = val.JsonTo<CommunicationBase>(newCom);
                }

                com.Add(newCom);
            }



            return com.To<T>(targetTypeDefault);
        }

        public static List<T> JsonListTo<T>(this string s, T targetTypeDefault)
        {
            var newList = new List<T>();

            var jList = new JsonList();
            jList.CreateList(s);

            foreach (var p in jList)
            {
                if (Converter.IsOfExclusiveTypes(typeof(T)))
                {
                    newList.Add(p.StringValue.To<T>(targetTypeDefault));
                }
                else
                {
                    var newTarget = (T)((typeof(T))).Assembly.CreateInstance((typeof(T)).FullName);
                    /*
                     Get Deeper Level From string Result
                     */
                    newList.Add(p.StringValue.JsonTo<T>(newTarget));
                }
            }

            return newList;
        }

        public static string ListToString<T>(this List<T> os, string spliter = ",")
        {
            var s = "";
            if (os == null || os.Count == 0) return "";
            foreach (var o in os)
                s += o.ToString() + spliter;

            return (s + spliter).Replace(spliter + spliter, "");
        }

        public static List<string> GetListFromString(this string s, char[] sep = null)
        {
            if (sep == null) sep = new char[] { ',', '،'};

            return s.Replace("[", "")
                .Replace("]", "")
                .Replace("'", "")
                .Split(sep, StringSplitOptions.RemoveEmptyEntries)
                .ToList()
                .Select(x => x.Trim())
                .Where(x => x != string.Empty).ToList();
        }

        public static List<string> GetListFromString(this string s, string[] sep  )
        {
           

            return s.Replace("[", "")
                .Replace("]", "")
                .Replace("'", "")
                .Split(sep, StringSplitOptions.RemoveEmptyEntries)
                .ToList()
                .Select(x=>x.Trim())
                .Where(x=>x != string.Empty ).ToList();
        }

        public static string ToTemplate(this object o, string template)
        {
            if (template.Contains("#["))
            {
                var iCom = o.To<CommunicationBase>(new CommunicationBase());

                foreach (var property in iCom)
                {
                    if (template.Contains("#[" + property.Name + "]"))
                    {
                        template = template.Replace("#[" + property.Name + "]", property.Value.ToString());
                    }
                }
            }

            return template;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="persianDate"></param>
        /// <returns></returns>
        public static DateTime PersianDateTimeToGergorian(string persianDate)
        {
            if (persianDate.IndexOf("/") < 3) persianDate = "13" + persianDate;
            var list = persianDate.Split(new char[] { '/', ' ', ':' }, StringSplitOptions.RemoveEmptyEntries).Cast<string>().ToList().Select(x => x.To<int>(0)).ToList();
            return PersianDateTimeToGergorian(list);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="persianDate"></param>
        /// <returns></returns>
        public static DateTime PersianDateTimeToGergorian(List<int> persianDate)
        {
            var persianCalendar = new System.Globalization.PersianCalendar();
            DateTime date = new DateTime(1900, 1, 1);
            List<int> Start = GergorianDateTimeToPersion(date);
            date = persianCalendar.AddYears(date, persianDate[0] - Start[0]);
            date = persianCalendar.AddMonths(date, persianDate[1] - Start[1]);
            date = persianCalendar.AddDays(date, persianDate[2] - Start[2]);

            try
            {
                date = persianCalendar.AddHours(date, persianDate[3] - Start[3]);
                date = persianCalendar.AddMinutes(date, persianDate[4] - Start[4]);
                date = persianCalendar.AddSeconds(date, persianDate[5] - Start[5]);
            }
            catch
            {
                date = persianCalendar.AddHours(date, 12 - Start[3]);
                date = persianCalendar.AddMinutes(date, 0 - Start[4]);
                date = persianCalendar.AddSeconds(date, 0 - Start[5]);
            }

            return date;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        public static List<int> GergorianDateTimeToPersion(DateTime date)
        {
            var persianCalendar = new System.Globalization.PersianCalendar();

            List<int> list = new List<int>();
            list.Add(persianCalendar.GetYear(date));
            list.Add(persianCalendar.GetMonth(date));
            list.Add(persianCalendar.GetDayOfMonth(date));
            list.Add(persianCalendar.GetHour(date));
            list.Add(persianCalendar.GetMinute(date));
            list.Add(persianCalendar.GetSecond(date));
            return list;

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        public static string GergorianDateTimeToPersionString(DateTime date)
        {
            try
            {
                var persianDatetTimePortionsList = GergorianDateTimeToPersion(date);
                return persianDatetTimePortionsList[0].ToString("0000") + "/" + persianDatetTimePortionsList[1].ToString("00") + "/" + persianDatetTimePortionsList[2].ToString("00");
            }
            catch
            {
                return " نا معتبر ";
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        public static string GergorianDateTimeToPersionStringRtl(DateTime date)
        {
            var persianDateTimePortionsList = GergorianDateTimeToPersion(date);
            return persianDateTimePortionsList[2].ToString("00") + "/" + persianDateTimePortionsList[1].ToString("00") + "/" + persianDateTimePortionsList[0].ToString("0000");
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="price"></param>
        /// <returns></returns>
        public static string ConvertPriceToPersianCurrencyTerms(double price)
        {
            var miliParts = ((float)price).ToString("N").Replace(".00", "").Split(',');
            var termArray = new List<string>() { "", "", "هزار", "میلیون", "میلیارد", "تیلریارد", "15", "18", "21", "24", "27", "30", "33" };

            var result = "";
            for (int i = 0; i < miliParts.Length; i++)
            {
                if (result != "")
                    result += " و ";
                result += ConvertPriceToPersianCurrencyTermsHundredLevel(miliParts[i].To<int>(0)) + " " + termArray[miliParts.Length - i];
            }

            if (result.Trim().EndsWith(" و")) result = result.Trim().Substring(0, result.Length - 3);

            return result + " تومان";
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="price"></param>
        /// <returns></returns>
        public static string ConvertPriceToPersianCurrencyTermsHundredLevel(int price)
        {
            var result = "";
            if (price >= 100)
            {
                int h = (int)((double)price / (double)100);

                switch (h)
                {
                    case 1: result += "یکصد"; break;
                    case 2: result += "دویست"; break;
                    case 3: result += "سیصد"; break;
                    case 4: result += "چهارصد"; break;
                    case 5: result += "پانصد"; break;
                    case 6: result += "ششصد"; break;
                    case 7: result += "هفتصد"; break;
                    case 8: result += "هشتصد"; break;
                    case 9: result += "نهصد"; break;
                }
            }

            if (price > 9 && price.ToString("000")[1].To<int>(0) > 0)
            {
                if (result != "")
                    result += " و ";
                int h = price.ToString("000")[1].To<int>(0);
                switch (h)
                {
                    case 1:
                        {
                            switch (price % 100)
                            {
                                case 10: result += "ده"; break;
                                case 11: result += "یازده"; break;
                                case 12: result += "دوازده"; break;
                                case 13: result += "سیزده"; break;
                                case 14: result += "چهارده"; break;
                                case 15: result += "پانزده"; break;
                                case 16: result += "شانزده"; break;
                                case 17: result += "هفده"; break;
                                case 18: result += "هجده"; break;
                                case 19: result += "نوزده"; break;
                            }
                            return result;
                        }
                    case 2: result += "بیست"; break;
                    case 3: result += "سی"; break;
                    case 4: result += "چهل"; break;
                    case 5: result += "پنجاه"; break;
                    case 6: result += "شصت"; break;
                    case 7: result += "هفتاد"; break;
                    case 8: result += "هشتاد"; break;
                    case 9: result += "نود"; break;
                }
            }

            if (price > 0)
            {
                if (result != "")
                    result += " و ";
                int h = price.ToString("000")[2].To<int>(0);

                switch (h)
                {
                    case 1: result += "یک"; break;
                    case 2: result += "دو"; break;
                    case 3: result += "سه"; break;
                    case 4: result += "چهار"; break;
                    case 5: result += "پنج"; break;
                    case 6: result += "شش"; break;
                    case 7: result += "هفت"; break;
                    case 8: result += "هشت"; break;
                    case 9: result += "نه"; break;
                }
            }

            return result;
        }

        public static string ConvertLongToStringBase(this long source, byte _base)
        {
            List<byte> _baseList = ConvertDecimalToGivenBase(source, _base);

            var result = "";
            foreach (var item in _baseList)
            {
                result = GetCharForBase34(item) + result;
            }

            return result;
        }


        public static string ConvertLongToStringBase_special(this long source, byte _base)
        {
            List<byte> _baseList = ConvertDecimalToGivenBase(source, _base);

            var result = "";
            foreach (var item in _baseList)
            {
                result = GetCharForBase34(item) + result;
            }

            return result;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="source"></param>
        /// <param name="_base"></param>
        /// <returns></returns>
        public static List<Byte> ConvertDecimalToGivenBase(long source, byte _base, List<Byte> _baseList = null)
        {
            if (_baseList == null)
                _baseList = new List<byte>();

            long p = source;

            while (p >= _base)
            {
                _baseList.Add((byte)(p % _base));
                p = (long)(p / _base);
            }
            _baseList.Add((byte)(p % _base));

            return _baseList;
        }


        public class HelperBase
        {
            public byte _base { get; set; }
            public long Value { get; set; }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="source"></param>
        /// <param name="_base"></param>
        /// <returns></returns>

        public static List<long> ToBaseLong(this List<HelperBase> parts)
        {
            long b = 0;
            var list = new List<long>();
            var counter = 0;
            foreach (var item in parts)
            {

                b = b * item._base + item.Value;


                /* last of 6 section with 3 part [op: 0][type: 0000][counter: 0000]*/
                if (counter > 0 && counter % 18 == 17)
                {
                    list.Add(b);
                    b = 0;
                }
                counter++;
            }
            /* reminding parts*/
            if (counter > 0 && b != 1 && counter % 18 > 0)
            {
                list.Add(b);
            }

            return list;
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static String GetCharForBase34(byte value)
        {
            switch (value)
            {
                case 0: return "0";
                case 1: return "1";
                case 2: return "2";
                case 3: return "3";
                case 4: return "4";
                case 5: return "5";
                case 6: return "6";
                case 7: return "7";
                case 8: return "8";
                case 9: return "9";
                case 10: return "a";
                case 11: return "b";
                case 12: return "c";
                case 13: return "d";
                case 14: return "e";
                case 15: return "f";
                case 16: return "g";
                case 17: return "h";
                case 18: return "j";
                case 19: return "k";
                case 20: return "l";
                case 21: return "m";
                case 22: return "n";
                case 23: return "o";
                case 24: return "p";
                case 25: return "q";
                case 26: return "r";
                case 27: return "s";
                case 28: return "t";
                case 29: return "u";
                case 30: return "v";
                case 31: return "w";
                case 32: return "x";
                case 33: return "y";
                case 34: return "z";
            }

            return value.ToString("00");
        }

        public static byte MaxBaseValue = 255;
        public static byte GetBase34ForChar(char value)
        {
            switch (value)
            {
                case '0': return 0;
                case '1': return 1;
                case '2': return 2;
                case '3': return 3;
                case '4': return 4;
                case '5': return 5;
                case '6': return 6;
                case '7': return 7;
                case '8': return 8;
                case '9': return 9;
                case 'a':
                case 'A': return 10;
                case 'b':
                case 'B': return 11;
                case 'c':
                case 'C': return 12;
                case 'd':
                case 'E': return 13;
                case 'e':
                case 'D': return 14;
                case 'f':
                case 'F': return 15;
                case 'g':
                case 'G': return 16;
                case 'h':
                case 'H': return 17;
                case 'j':
                case 'J': return 18;
                case 'k':
                case 'K': return 19;
                case 'l':
                case 'L': return 20;
                case 'm':
                case 'M': return 21;
                case 'n':
                case 'N': return 22;
                case 'o':
                case 'O': return 23;
                case 'p':
                case 'P': return 24;
                case 'q':
                case 'Q': return 25;
                case 'r':
                case 'R': return 26;
                case 's':
                case 'S': return 27;
                case 't':
                case 'T': return 28;
                case 'u':
                case 'U': return 29;
                case 'v':
                case 'V': return 30;
                case 'w':
                case 'W': return 31;
                case 'x':
                case 'X': return 32;
                case 'y':
                case 'Y': return 33;
                case 'z':
                case 'Z': return 34;
            }

            return MaxBaseValue;
        }

        public static long GetBase34ForHash(string value)
        {
            long b = 0;

            for (int i = 0; i < value.Length; i++)
            {
                var fetchedValue = GetBase34ForChar(value[i]);
                if (fetchedValue < MaxBaseValue)
                    b = b * 34 + (long)fetchedValue;
            }

            return b;
        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="o"></param>
        /// <param name="len"></param>
        /// <param name="defaultValue"></param>
        /// <returns></returns>
        public static string ToSubString(this object o, int len, string defaultValue)
        {
            Converter Converter = new Converter(o, defaultValue);
            var s = Converter.StringValue;
            if (s.Length > len)
                return s.Substring(0, len - 3) + "...";
            return s;
        }

        public static string PersianString(this string obj)
        {
            if (string.IsNullOrEmpty(obj))
                return string.Empty;
            return obj.ToString().Replace((char)1603/*ك*/, (char)1705/*ک*/)
                                 .Replace((char)1610/*ي*/, (char)1740/*ی*/)
                             .Replace('0', '٠')
            .Replace('1', '١')
            .Replace('2', '٢')
            .Replace('3', '٣')
            .Replace('4', '٤')
            .Replace('5', '٥')
            .Replace('6', '٦')
            .Replace('7', '٧')
            .Replace('8', '٨')
            .Replace('9', '٩');
        }
        public static string LatinNumberString(this string obj)
        {
            if (string.IsNullOrEmpty(obj))
                return string.Empty;
            return obj.ToString()
            .Replace('٠', '0')
            .Replace('١', '1')
            .Replace('٢', '2')
            .Replace('٣', '3')
            .Replace('٤', '4')
            .Replace('٥', '5')
            .Replace('٦', '6')
            .Replace('٧', '7')
            .Replace('٨', '8')
            .Replace('٩', '9');
        }
    }


}
