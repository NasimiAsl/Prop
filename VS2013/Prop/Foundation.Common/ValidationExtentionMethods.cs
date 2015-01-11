using System;
using System.Collections.Generic;


namespace System
{
    public static class ExtentionMethods
    {
        public static object ValidateRequiredField(this object o, string fieldNameInPersian, ValidationBase validationBase)
        {
            if (o == null || o.ToString() == string.Empty)
            {
                validationBase.ValidationMessages.Add(fieldNameInPersian + " is Required. ");
            }
            return o;
        }

        public static object ValidateStringLengthRange(this object o, int min, int? max, string fieldNameInPersian, ValidationBase validationBase)
        {
            if (o != null && max == null && o.ToString().Length < min)
            {
                validationBase.ValidationMessages.Add(fieldNameInPersian + " length must be greater than " + min.ToString() + " chars. ");
            }
            else if (o != null && max != null && (o.ToString().Length < min || o.ToString().Length > max.Value))
            {
                validationBase.ValidationMessages.Add(fieldNameInPersian + " length must be between  " + min.ToString() + " and " + max.Value.ToString() + " chars. ");
            }

            return o;
        }

        public static object ValidateNumberRange(this object o, double? min, double? max, string fieldNameInPersian, ValidationBase validationBase)
        {

            if (o != null && max == null && o.To<double>(0.0) < min.Value)
            {
                validationBase.ValidationMessages.Add(fieldNameInPersian + " must be greater than " + min.Value.ToString() + " . ");
            }
            if (o != null && min == null && o.To<double>(0.0) > max.Value)
            {
                validationBase.ValidationMessages.Add(fieldNameInPersian + " must be smaller than " + max.Value.ToString() + " . ");
            }
            else if (o != null && min != null && max != null && (o.To<double>(0.0) < min.Value || o.To<double>(0.0) > max.Value))
            {
                validationBase.ValidationMessages.Add(fieldNameInPersian + " must be between  " + min.Value.ToString() + " and " + max.Value.ToString() + " . ");
            }

            return o;
        }

        public static object ValidateDropDownValue(this object o, int value, string fieldNameInPersian, ValidationBase validationBase)
        {
            if (o == null || value == 0)
            {
                validationBase.ValidationMessages.Add(fieldNameInPersian + " is Required. ");
            }

            return o;
        }

        public static object ValidateDateTimeRange(this object o, DateTime? startDate, DateTime? endDate, string fieldNameInPersian, ValidationBase validationBase)
        {

            if (o != null && endDate == null && o.To<DateTime>(DateTime.Now) < startDate.Value)
            {
                validationBase.ValidationMessages.Add(fieldNameInPersian + " must be greater than " + startDate.Value.ToString() + " . ");
            }
            else if (o != null && startDate == null && o.To<DateTime>(DateTime.Now) > endDate.Value)
            {
                validationBase.ValidationMessages.Add(fieldNameInPersian + " must be smaller than " + endDate.Value.ToString() + " . ");
            }
            else if (o != null && endDate != null && startDate != null && (o.To<DateTime>(DateTime.Now) < startDate.Value || o.To<DateTime>(DateTime.Now) > endDate.Value))
            {
                validationBase.ValidationMessages.Add(fieldNameInPersian + " must be between  " + startDate.Value.ToString() + " and " + endDate.Value.ToString() + " . ");
            }
            return o;
        }

        public static object ValidateRegex(this object o, string fieldNameInPersian, string pattern, ValidationBase validationBase)
        {
            System.Text.RegularExpressions.Regex regex = new System.Text.RegularExpressions.Regex(pattern);
            bool isMatch = regex.IsMatch(o.ToString());
            if (!isMatch)
                validationBase.ValidationMessages.Add(fieldNameInPersian + " is not valid.");
            return o;
        }

        public static object ValidateExceptEnglish(this object o, ValidationBase validationBase, string fieldNameInPersian)
        {
            var input = o.ToString();
            bool onlyLatinChars = true;
            int length = input.Length;
            char tempChar;
            int tempCode;

            for (int i = 0; i < length; i++)
            {
                tempChar = char.Parse(input.Substring(i, 1));
                tempCode = (int)tempChar;

                if (tempCode < 32 || tempCode > 126)
                {
                    onlyLatinChars = false;
                }
            }

            if (!onlyLatinChars)
                validationBase.ValidationMessages.Add("لطفا از کاراکترهای انگلیسی برای " + fieldNameInPersian + " استفاده نمایید ");

            return o;
        }

        public static object ValidateExistsIn(this object o, string fieldNameInPersian, List<object> items, object uncheckdItem, ValidationBase validationBase)
        {
            if (uncheckdItem != null)
                items.Remove(uncheckdItem);

            object newObject = null;

            if (o.GetType() == typeof(string))
                newObject = o.ToString().Trim();
            else
                newObject = o;

            if (items != null && items.Contains(newObject))
                validationBase.ValidationMessages.Add(fieldNameInPersian + " is exists.");

            return o;
        }


        public static object ValidateRequiredField_WithMsg(this object o, string msg, ValidationBase validationBase)
        {
            if (o == null || o.ToString() == string.Empty)
            {
                validationBase.ValidationMessages.Add(msg);
            }
            return o;
        }

        public static object ValidateStringLengthRange_WithMsg(this object o, int? min, int? max, string msg, ValidationBase validationBase)
        {
            if (o != null && max == null && o.ToString().Length < min)
            {
                validationBase.ValidationMessages.Add(msg);
            }
            else if (o != null && max != null && (o.ToString().Length < min || o.ToString().Length > max.Value))
            {
                validationBase.ValidationMessages.Add(msg);
            }

            return o;
        }

        public static object ValidateNumberRange_WithMsg(this object o, double? min, double? max, string msg, ValidationBase validationBase)
        {

            if (o != null && max == null && o.To<double>(0.0) < min.Value)
            {
                validationBase.ValidationMessages.Add(msg);
            }
            if (o != null && min == null && o.To<double>(0.0) > max.Value)
            {
                validationBase.ValidationMessages.Add(msg);
            }
            else if (o != null && min != null && max != null && (o.To<double>(0.0) < min.Value || o.To<double>(0.0) > max.Value))
            {
                validationBase.ValidationMessages.Add(msg);
            }

            return o;
        }

        public static object ValidateDropDownValue_WithMsg(this object o, int value, string msg, ValidationBase validationBase)
        {
            if (o == null || value == 0)
            {
                validationBase.ValidationMessages.Add(msg);
            }
            return o;
        }

        public static object ValidateDateTimeRange_WithMsg(this object o, DateTime? startDate, DateTime? endDate, string msg, ValidationBase validationBase)
        {
            if (o != null && endDate == null && o.To<DateTime>(DateTime.Now) < startDate.Value)
            {
                validationBase.ValidationMessages.Add(msg);
            }
            else if (o != null && startDate == null && o.To<DateTime>(DateTime.Now) > endDate.Value)
            {
                validationBase.ValidationMessages.Add(msg);
            }
            else if (o != null && endDate != null && startDate != null && (o.To<DateTime>(DateTime.Now) < startDate.Value || o.To<DateTime>(DateTime.Now) > endDate.Value))
            {
                validationBase.ValidationMessages.Add(msg);
            }
            return o;
        }

        public static object ValidateRegex_WithMsg(this object o, string pattern, string msg, ValidationBase validationBase)
        {
            if (o != null)
            {
                System.Text.RegularExpressions.Regex regex = new System.Text.RegularExpressions.Regex(pattern);
                bool isMatch = regex.IsMatch(o.ToString());
                if (!isMatch)
                    validationBase.ValidationMessages.Add(msg);
            }
            return o;
        }

        public static object ValidateMatch_WithMsg(this object o, string msg, string matchValue, ValidationBase validationBase)
        {
            if (o != null)
            {
                if (o.ToString() != matchValue)
                    validationBase.ValidationMessages.Add(msg);
            }
            return o;
        }

        public static object ValidateExceptEnglish_WithMsg(this object o, ValidationBase validationBase, string msg)
        {
            var input = o.ToString();
            bool onlyLatinChars = true;
            int length = input.Length;
            char tempChar;
            int tempCode;

            for (int i = 0; i < length; i++)
            {
                tempChar = char.Parse(input.Substring(i, 1));
                tempCode = (int)tempChar;

                if (tempCode < 32 || tempCode > 126)
                {
                    onlyLatinChars = false;
                }
            }

            if (!onlyLatinChars)
                validationBase.ValidationMessages.Add(msg);

            return o;
        }

        public static object ValidateExistsIn_WithMsg(this object o, string msg, List<object> items, object uncheckdItem, ValidationBase validationBase)
        {
            if (uncheckdItem != null)
                items.Remove(uncheckdItem);

            object newObject = null;

            if (o.GetType() == typeof(string))
                newObject = o.ToString().Trim();
            else
                newObject = o;

            if (items != null && items.Contains(newObject))
                validationBase.ValidationMessages.Add(msg);

            return o;
        }

        public class RegexTypes
        {
            public static string MailPattern = @"^(([^<>()[\]\\.,;:\s@\""]+" + @"(\.[^<>()[\]\\.,;:\s@\""]+)*)|(\"".+\""))@" + @"((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}" + @"\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+" + @"[a-zA-Z]{2,}))$";
            public static string Integer = @"^(([^<>()[\]\\.,;:\s@\""]+" + @"(\.[^<>()[\]\\.,;:\s@\""]+)*)|(\"".+\""))@" + @"((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}" + @"\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+" + @"[a-zA-Z]{2,}))$";
            public static string Real = @"^(([^<>()[\]\\.,;:\s@\""]+" + @"(\.[^<>()[\]\\.,;:\s@\""]+)*)|(\"".+\""))@" + @"((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}" + @"\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+" + @"[a-zA-Z]{2,}))$";
        }

    }
}
