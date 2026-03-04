import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

export const formatCPF = (value?: string | null) => {
  const digits = (value || '').replace(/\D/g, '').slice(0, 11);

  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
};


export const formatRandomPixKey = (value: string) => {
  const clean = value.replace(/[^a-zA-Z0-9]/g, '');

  if (clean.length < 32) return value;

  const limited = clean.slice(0, 32);

  return limited.slice(0, 8) + '-' +
    limited.slice(8, 12) + '-' +
    limited.slice(12, 16) + '-' +
    limited.slice(16, 20) + '-' +
    limited.slice(20, 32);
};
export const formatPhone = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');
};

export const formatCEP = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{3})\d+?$/, '$1');
};

export const formatDate = (dateString: string) => {
  return dayjs(dateString).format('DD/MM/YYYY');
};



export const formatCurrency = (value: number | string | undefined): string => {
  const num = Number(value);
  if (isNaN(num)) return 'Valor inválido';

  return num.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
};

export const formatDateTime = (dateString: string) => {
  return dayjs(dateString).format('DD/MM/YY HH:mm');
};


export const maskCPF = (value: string) => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length < 5) return cleaned;

  const firstThree = cleaned.slice(0, 3);
  const lastTwo = cleaned.slice(-2);
  const masked = firstThree + '.***.***-' + lastTwo;

  return masked;
};

export const maskPhone = (value: string): string => {
  const onlyNumbers = value.replace(/\D/g, '');
  if (onlyNumbers.length < 10) return onlyNumbers;

  const firstTwo = onlyNumbers.slice(0, 2);
  const middle = '***';
  const lastFour = onlyNumbers.slice(-4, -2) + '**';

  return `(${firstTwo}) ${middle}${onlyNumbers.slice(5, 7)}${lastFour}`;
};


export const formatCNPJ = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

export const formatDateToBrazilian = (dateString: string): string => {
  if (!dateString) return '';

  const [year, month, day] = dateString.split('-');

  if (!year || !month || !day) return dateString;

  return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
}

export const statusToColor = (status: string): string => {
  const colorMap: Record<string, string> = {
    waiting_signature: '#fbbf24', // amarelo
    waiting_payment: '#60a5fa',   // azul
    paid: '#22c55e',              // verde
    rejected: '#ef4444',          // vermelho
  };

  return colorMap[status] || '#9ca3af'; // cinza como padrão
};

export const translateStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    waiting_signature: 'Aguardando Assinatura',
    waiting_payment: 'Aguardando Pagamento',
    paid: 'Pago',
    rejected: 'Rejeitado',
  };

  return statusMap[status] || 'Desconhecido';
};

export const formatDateToBrazilianWithTime = (dateString: string): string => {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;
    }
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} às ${hours}:${minutes}`;
  } catch (error) {
    console.error("Erro ao formatar data:", error);
    return dateString;
  }
}

export const formatInternationalPhone = (value?: string | null) => {
  if (!value) return '';

  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d{2})(\d)/, '+$1 ($2) $3')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');
};
