import { useState, useCallback, useRef, useEffect } from 'react';
import {
  BoardState,
  BuyuklukEnum,
  BUYUKLUK_LABELS,
  ConsoleStep,
  Kart,
  LineType,
  TerminalLine,
} from '../types/todo';
import { getInitialBoardState } from '../data/initialData';

interface AddCardTemp {
  baslik?: string;
  icerik?: string;
  buyukluk?: BuyuklukEnum;
  atananKisiId?: number;
}

interface MoveCardTemp {
  kartId: string;
  fromLine: LineType;
  kart: Kart;
}

interface UpdateCardTemp {
  kartId: string;
  line: LineType;
  kart: Kart;
  fieldToUpdate?: 'baslik' | 'icerik' | 'buyukluk' | 'atananKisiId';
}

const MAIN_MENU_TEXT = [
  '  Lütfen yapmak istediğiniz işlemi seçiniz :)',
  '  *******************************************',
  '  (1) Board Listelemek',
  '  (2) Board\'a Kart Eklemek',
  '  (3) Board\'dan Kart Silmek',
  '  (4) Kart Taşımak',
  '  (5) Kart Güncellemek',
  '  (6) Takım Üyelerini Listelemek',
  '  (C) Ekranı Temizle (cls)',
];

export function useConsoleToDo() {
  const [boardState, setBoardState] = useState<BoardState>(getInitialBoardState);
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([]);
  const [currentStep, setCurrentStep] = useState<ConsoleStep>('MAIN_MENU');
  const [currentPrompt, setCurrentPrompt] = useState<string>('Seçiminiz: ');
  const [inputValue, setInputValue] = useState<string>('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Temps for multi-step console wizards
  const [addTemp, setAddTemp] = useState<AddCardTemp>({});
  const [moveTemp, setMoveTemp] = useState<MoveCardTemp | null>(null);
  const [updateTemp, setUpdateTemp] = useState<UpdateCardTemp | null>(null);

  // Ref to access current state inside callbacks
  const boardStateRef = useRef(boardState);
  boardStateRef.current = boardState;

  const currentStepRef = useRef(currentStep);
  currentStepRef.current = currentStep;

  const addLine = useCallback((text: string, type: TerminalLine['type'] = 'output') => {
    const newLine: TerminalLine = {
      id: Math.random().toString(36).substring(2, 9),
      text,
      type,
      timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };
    setTerminalLines((prev) => [...prev, newLine]);
  }, []);

  const addMultipleLines = useCallback((lines: { text: string; type?: TerminalLine['type'] }[]) => {
    const newLines: TerminalLine[] = lines.map((l) => ({
      id: Math.random().toString(36).substring(2, 9),
      text: l.text,
      type: l.type || 'output',
      timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    }));
    setTerminalLines((prev) => [...prev, ...newLines]);
  }, []);

  const printMainMenu = useCallback(() => {
    const lines = [
      { text: '', type: 'output' as const },
      ...MAIN_MENU_TEXT.map((t) => ({
        text: t,
        type: t.includes('Lütfen') ? ('header' as const) : t.includes('***') ? ('system' as const) : ('output' as const),
      })),
    ];
    addMultipleLines(lines);
    setCurrentStep('MAIN_MENU');
    setCurrentPrompt('Seçiminiz: ');
  }, [addMultipleLines]);

  const listBoard = useCallback((stateOverride?: BoardState) => {
    const currentBoard = stateOverride || boardStateRef.current;
    const output: { text: string; type?: TerminalLine['type'] }[] = [];

    const linesOrder: LineType[] = ['TODO', 'IN_PROGRESS', 'DONE'];

    linesOrder.forEach((lineKey) => {
      const lineName = lineKey === 'TODO' ? 'TODO Line' : lineKey === 'IN_PROGRESS' ? 'IN PROGRESS Line' : 'DONE Line';
      output.push({ text: '', type: 'output' });
      output.push({ text: ` ${lineName}`, type: 'header' });
      output.push({ text: ' ************************', type: 'system' });

      const cards = currentBoard.lines[lineKey];
      if (cards.length === 0) {
        output.push({ text: ' ~ BOŞ ~', type: 'output' });
      } else {
        cards.forEach((kart, idx) => {
          const atanan = currentBoard.takimUyeleri[kart.atananKisiId]?.isim || 'Tanımsız';
          const buyukluk = BUYUKLUK_LABELS[kart.buyukluk] || 'XS';

          output.push({ text: ` Başlık      : ${kart.baslik}`, type: 'card' });
          output.push({ text: ` İçerik      : ${kart.icerik}`, type: 'output' });
          output.push({ text: ` Atanan Kişi : ${atanan} (ID: ${kart.atananKisiId})`, type: 'output' });
          output.push({ text: ` Büyüklük    : ${buyukluk}`, type: 'output' });

          if (idx < cards.length - 1) {
            output.push({ text: ' -', type: 'system' });
          }
        });
      }
    });

    addMultipleLines(output);
  }, [addMultipleLines]);

  const listTeamMembers = useCallback(() => {
    const currentBoard = boardStateRef.current;
    const output: { text: string; type?: TerminalLine['type'] }[] = [
      { text: '', type: 'output' },
      { text: ' Takım Üyeleri Listesi (Dictionary<int, TakimUyesi>)', type: 'header' },
      { text: ' ====================================================', type: 'system' },
    ];

    Object.values(currentBoard.takimUyeleri).forEach((uye) => {
      output.push({
        text: ` [ID: ${uye.id}] ${uye.isim} - ${uye.unvan}`,
        type: 'output',
      });
    });

    output.push({ text: ' ====================================================', type: 'system' });
    addMultipleLines(output);
  }, [addMultipleLines]);

  // Initial welcome message
  useEffect(() => {
    const welcome = [
      { text: '=============================================================', type: 'system' as const },
      { text: '  C# Console ToDo Uygulaması [Sürüm 2.0.4]', type: 'header' as const },
      { text: '  Geliştirici & Mimar: ENES ÖZTÜRK', type: 'header' as const },
      { text: '  3 Kolonlu Kanban Mimarisi: [TODO] - [IN PROGRESS] - [DONE]', type: 'system' as const },
      { text: '=============================================================', type: 'system' as const },
    ];
    addMultipleLines(welcome);
    printMainMenu();
  }, [addMultipleLines, printMainMenu]);

  // Execute a command input
  const handleCommand = useCallback(
    (input: string) => {
      const trimmed = input.trim();

      // Echo user input
      addLine(`${currentPrompt}${input}`, 'input');

      // Update history
      if (trimmed) {
        setCommandHistory((prev) => [...prev, trimmed]);
        setHistoryIndex(-1);
      }

      const step = currentStepRef.current;
      const currentBoard = boardStateRef.current;

      // Handle cls / clear anywhere
      if (trimmed.toLowerCase() === 'cls' || trimmed.toLowerCase() === 'clear') {
        setTerminalLines([]);
        printMainMenu();
        return;
      }

      switch (step) {
        case 'MAIN_MENU': {
          if (trimmed === '1') {
            listBoard();
            printMainMenu();
          } else if (trimmed === '2') {
            setAddTemp({});
            setCurrentStep('ADD_TITLE');
            setCurrentPrompt(' Başlık Giriniz                                  : ');
          } else if (trimmed === '3') {
            addLine(' Öncelikle silmek istediğiniz kartı seçmeniz gerekiyor.', 'system');
            setCurrentStep('DELETE_TITLE');
            setCurrentPrompt(' Lütfen kart başlığını yazınız: ');
          } else if (trimmed === '4') {
            addLine(' Öncelikle taşımak istediğiniz kartı seçmeniz gerekiyor.', 'system');
            setCurrentStep('MOVE_TITLE');
            setCurrentPrompt(' Lütfen kart başlığını yazınız: ');
          } else if (trimmed === '5') {
            addLine(' Güncellemek istediğiniz kartın başlığını giriniz:', 'system');
            setCurrentStep('UPDATE_TITLE');
            setCurrentPrompt(' Kart Başlığı: ');
          } else if (trimmed === '6') {
            listTeamMembers();
            printMainMenu();
          } else if (trimmed.toLowerCase() === 'c') {
            setTerminalLines([]);
            printMainMenu();
          } else {
            addLine(' Hatalı seçim yaptınız! Lütfen menüdeki seçeneklerden (1-6) birini seçiniz.', 'error');
            printMainMenu();
          }
          break;
        }

        // ADD CARD FLOW
        case 'ADD_TITLE': {
          if (!trimmed) {
            addLine(' Başlık boş bırakılamaz! Lütfen bir başlık giriniz.', 'error');
            return;
          }
          setAddTemp((prev) => ({ ...prev, baslik: trimmed }));
          setCurrentStep('ADD_CONTENT');
          setCurrentPrompt(' İçerik Giriniz                                  : ');
          break;
        }

        case 'ADD_CONTENT': {
          setAddTemp((prev) => ({ ...prev, icerik: trimmed || 'İçerik belirtilmedi' }));
          setCurrentStep('ADD_SIZE');
          setCurrentPrompt(' Büyüklük Seçiniz -> XS(1),S(2),M(3),L(4),XL(5)  : ');
          break;
        }

        case 'ADD_SIZE': {
          const val = parseInt(trimmed, 10);
          if (isNaN(val) || val < 1 || val > 5) {
            addLine(' Hatalı girişler yaptınız! Büyüklük 1 ile 5 arasında bir sayı olmalıdır.', 'error');
            printMainMenu();
            return;
          }
          setAddTemp((prev) => ({ ...prev, buyukluk: val as BuyuklukEnum }));
          // Show list of valid team member IDs for convenience
          const membersHelp = Object.values(currentBoard.takimUyeleri)
            .map((m) => `[ID:${m.id}] ${m.isim}`)
            .join(' | ');
          addLine(` Takım Üyeleri: ${membersHelp}`, 'system');
          setCurrentStep('ADD_MEMBER');
          setCurrentPrompt(' Kişi Seçiniz (ID)                               : ');
          break;
        }

        case 'ADD_MEMBER': {
          const id = parseInt(trimmed, 10);
          if (isNaN(id) || !currentBoard.takimUyeleri[id]) {
            addLine(' Hatalı girişler yaptınız! Tanımlı bir takım üyesi ID\'si girmediniz.', 'error');
            printMainMenu();
            return;
          }

          const newCard: Kart = {
            id: `kart-${Date.now()}`,
            baslik: addTemp.baslik || 'Yeni Kart',
            icerik: addTemp.icerik || '',
            atananKisiId: id,
            buyukluk: addTemp.buyukluk || BuyuklukEnum.M,
            line: 'TODO',
            olusturmaTarihi: new Date().toLocaleString('tr-TR', { dateStyle: 'short', timeStyle: 'short' }),
          };

          const updatedBoard: BoardState = {
            ...currentBoard,
            lines: {
              ...currentBoard.lines,
              TODO: [...currentBoard.lines.TODO, newCard],
            },
          };

          setBoardState(updatedBoard);
          boardStateRef.current = updatedBoard;
          addLine(` ✓ Kart başarıyla TODO Line'a eklendi! [${newCard.baslik}]`, 'success');
          printMainMenu();
          break;
        }

        // DELETE CARD FLOW
        case 'DELETE_TITLE': {
          const searchTitle = trimmed.toLowerCase();
          const allLines: LineType[] = ['TODO', 'IN_PROGRESS', 'DONE'];
          let matchedCount = 0;

          allLines.forEach((lineKey) => {
            currentBoard.lines[lineKey].forEach((k) => {
              if (k.baslik.trim().toLowerCase() === searchTitle) {
                matchedCount++;
              }
            });
          });

          if (matchedCount === 0) {
            addLine('', 'output');
            addLine(' Aradığınız kriterlere uygun kart board\'da bulunamadı. Lütfen bir seçim yapınız.', 'error');
            addLine(' * Silmeyi sonlandırmak için : (1)', 'system');
            addLine(' * Yeniden denemek için       : (2)', 'system');
            setCurrentStep('DELETE_NOT_FOUND_CHOICE');
            setCurrentPrompt(' Seçiminiz (1/2): ');
            return;
          }

          // Delete card(s)
          const newLines = {
            TODO: currentBoard.lines.TODO.filter((k) => k.baslik.trim().toLowerCase() !== searchTitle),
            IN_PROGRESS: currentBoard.lines.IN_PROGRESS.filter((k) => k.baslik.trim().toLowerCase() !== searchTitle),
            DONE: currentBoard.lines.DONE.filter((k) => k.baslik.trim().toLowerCase() !== searchTitle),
          };

          const updatedBoard: BoardState = {
            ...currentBoard,
            lines: newLines,
          };

          setBoardState(updatedBoard);
          boardStateRef.current = updatedBoard;
          addLine(` ✓ '${trimmed}' başlıklı ${matchedCount} adet kart board'dan başarıyla silindi.`, 'success');
          printMainMenu();
          break;
        }

        case 'DELETE_NOT_FOUND_CHOICE': {
          if (trimmed === '1') {
            addLine(' Silme işlemi sonlandırıldı.', 'system');
            printMainMenu();
          } else if (trimmed === '2') {
            setCurrentStep('DELETE_TITLE');
            setCurrentPrompt(' Lütfen kart başlığını yazınız: ');
          } else {
            addLine(' Hatalı seçim yaptınız! Lütfen (1) veya (2) giriniz.', 'error');
          }
          break;
        }

        // MOVE CARD FLOW
        case 'MOVE_TITLE': {
          const searchTitle = trimmed.toLowerCase();
          const allLines: LineType[] = ['TODO', 'IN_PROGRESS', 'DONE'];
          let foundKart: Kart | null = null;
          let foundLine: LineType | null = null;

          for (const lineKey of allLines) {
            const match = currentBoard.lines[lineKey].find(
              (k) => k.baslik.trim().toLowerCase() === searchTitle
            );
            if (match) {
              foundKart = match;
              foundLine = lineKey;
              break;
            }
          }

          if (!foundKart || !foundLine) {
            addLine('', 'output');
            addLine(' Aradığınız kriterlere uygun kart board\'da bulunamadı. Lütfen bir seçim yapınız.', 'error');
            addLine(' * İşlemi sonlandırmak için : (1)', 'system');
            addLine(' * Yeniden denemek için      : (2)', 'system');
            setCurrentStep('MOVE_NOT_FOUND_CHOICE');
            setCurrentPrompt(' Seçiminiz (1/2): ');
            return;
          }

          setMoveTemp({
            kartId: foundKart.id,
            fromLine: foundLine,
            kart: foundKart,
          });

          const atanan = currentBoard.takimUyeleri[foundKart.atananKisiId]?.isim || 'Tanımsız';
          const buyukluk = BUYUKLUK_LABELS[foundKart.buyukluk] || 'XS';
          const lineLabel = foundLine === 'TODO' ? 'TODO' : foundLine === 'IN_PROGRESS' ? 'IN PROGRESS' : 'DONE';

          const cardDetails = [
            { text: '', type: 'output' as const },
            { text: ' Bulunan Kart Bilgileri:', type: 'header' as const },
            { text: ' **************************************', type: 'system' as const },
            { text: ` Başlık      : ${foundKart.baslik}`, type: 'card' as const },
            { text: ` İçerik      : ${foundKart.icerik}`, type: 'output' as const },
            { text: ` Atanan Kişi : ${atanan}`, type: 'output' as const },
            { text: ` Büyüklük    : ${buyukluk}`, type: 'output' as const },
            { text: ` Line        : ${lineLabel}`, type: 'output' as const },
            { text: '', type: 'output' as const },
            { text: ' Lütfen taşımak istediğiniz Line\'ı seçiniz: ', type: 'system' as const },
            { text: ' (1) TODO', type: 'output' as const },
            { text: ' (2) IN PROGRESS', type: 'output' as const },
            { text: ' (3) DONE', type: 'output' as const },
          ];

          addMultipleLines(cardDetails);
          setCurrentStep('MOVE_SELECT_LINE');
          setCurrentPrompt(' Line Seçiminiz (1-3): ');
          break;
        }

        case 'MOVE_NOT_FOUND_CHOICE': {
          if (trimmed === '1') {
            addLine(' Taşıma işlemi sonlandırıldı.', 'system');
            printMainMenu();
          } else if (trimmed === '2') {
            setCurrentStep('MOVE_TITLE');
            setCurrentPrompt(' Lütfen kart başlığını yazınız: ');
          } else {
            addLine(' Hatalı seçim yaptınız! Lütfen (1) veya (2) giriniz.', 'error');
          }
          break;
        }

        case 'MOVE_SELECT_LINE': {
          const targetLineMap: Record<string, LineType> = {
            '1': 'TODO',
            '2': 'IN_PROGRESS',
            '3': 'DONE',
          };

          const targetLine = targetLineMap[trimmed];
          if (!targetLine || !moveTemp) {
            addLine(' Hatalı bir seçim yaptınız! İşlem sonlandırıldı.', 'error');
            setMoveTemp(null);
            printMainMenu();
            return;
          }

          if (targetLine === moveTemp.fromLine) {
            addLine(` Kart zaten ${targetLine} Line'ında bulunmaktadır. Taşıma yapılmadı.`, 'system');
            setMoveTemp(null);
            printMainMenu();
            return;
          }

          // Move the card
          const cardToMove: Kart = {
            ...moveTemp.kart,
            line: targetLine,
          };

          const updatedBoard: BoardState = {
            ...currentBoard,
            lines: {
              ...currentBoard.lines,
              [moveTemp.fromLine]: currentBoard.lines[moveTemp.fromLine].filter((k) => k.id !== moveTemp.kartId),
              [targetLine]: [...currentBoard.lines[targetLine], cardToMove],
            },
          };

          setBoardState(updatedBoard);
          boardStateRef.current = updatedBoard;
          setMoveTemp(null);

          addLine(` ✓ Kart başarıyla ${targetLine} Line'ına taşındı!`, 'success');
          addLine(' Güncel Board durumu:', 'system');
          listBoard(updatedBoard);
          printMainMenu();
          break;
        }

        // UPDATE CARD FLOW
        case 'UPDATE_TITLE': {
          const searchTitle = trimmed.toLowerCase();
          const allLines: LineType[] = ['TODO', 'IN_PROGRESS', 'DONE'];
          let foundKart: Kart | null = null;
          let foundLine: LineType | null = null;

          for (const lineKey of allLines) {
            const match = currentBoard.lines[lineKey].find(
              (k) => k.baslik.trim().toLowerCase() === searchTitle
            );
            if (match) {
              foundKart = match;
              foundLine = lineKey;
              break;
            }
          }

          if (!foundKart || !foundLine) {
            addLine(' Güncellenecek kart bulunamadı.', 'error');
            addLine(' * Güncellemeyi sonlandırmak için : (1)', 'system');
            addLine(' * Yeniden denemek için           : (2)', 'system');
            setCurrentStep('UPDATE_NOT_FOUND_CHOICE');
            setCurrentPrompt(' Seçiminiz (1/2): ');
            return;
          }

          setUpdateTemp({
            kartId: foundKart.id,
            line: foundLine,
            kart: foundKart,
          });

          const atanan = currentBoard.takimUyeleri[foundKart.atananKisiId]?.isim || 'Tanımsız';
          addLine(` Seçilen Kart: [${foundKart.baslik}] - ${atanan} - Büyüklük: ${BUYUKLUK_LABELS[foundKart.buyukluk]}`, 'header');
          addLine(' Hangi alanı güncellemek istiyorsunuz?', 'system');
          addLine(' (1) Başlık', 'output');
          addLine(' (2) İçerik', 'output');
          addLine(' (3) Büyüklük (XS-XL)', 'output');
          addLine(' (4) Atanan Kişi (ID)', 'output');
          addLine(' (0) İptal', 'output');
          setCurrentStep('UPDATE_FIELD_CHOICE');
          setCurrentPrompt(' Alan Seçiniz (0-4): ');
          break;
        }

        case 'UPDATE_NOT_FOUND_CHOICE': {
          if (trimmed === '1') {
            addLine(' Güncelleme iptal edildi.', 'system');
            printMainMenu();
          } else if (trimmed === '2') {
            setCurrentStep('UPDATE_TITLE');
            setCurrentPrompt(' Kart Başlığı: ');
          } else {
            addLine(' Lütfen (1) veya (2) giriniz.', 'error');
          }
          break;
        }

        case 'UPDATE_FIELD_CHOICE': {
          if (!updateTemp) {
            printMainMenu();
            return;
          }
          if (trimmed === '0') {
            addLine(' Güncelleme iptal edildi.', 'system');
            setUpdateTemp(null);
            printMainMenu();
            return;
          }

          if (trimmed === '1') {
            setUpdateTemp((prev) => prev ? { ...prev, fieldToUpdate: 'baslik' } : null);
            setCurrentStep('UPDATE_FIELD_VALUE');
            setCurrentPrompt(` Yeni Başlık (Mevcut: ${updateTemp.kart.baslik}): `);
          } else if (trimmed === '2') {
            setUpdateTemp((prev) => prev ? { ...prev, fieldToUpdate: 'icerik' } : null);
            setCurrentStep('UPDATE_FIELD_VALUE');
            setCurrentPrompt(` Yeni İçerik (Mevcut: ${updateTemp.kart.icerik}): `);
          } else if (trimmed === '3') {
            setUpdateTemp((prev) => prev ? { ...prev, fieldToUpdate: 'buyukluk' } : null);
            setCurrentStep('UPDATE_FIELD_VALUE');
            setCurrentPrompt(' Yeni Büyüklük -> XS(1),S(2),M(3),L(4),XL(5): ');
          } else if (trimmed === '4') {
            setUpdateTemp((prev) => prev ? { ...prev, fieldToUpdate: 'atananKisiId' } : null);
            const membersHelp = Object.values(currentBoard.takimUyeleri)
              .map((m) => `[ID:${m.id}] ${m.isim}`)
              .join(' | ');
            addLine(` Takım Üyeleri: ${membersHelp}`, 'system');
            setCurrentStep('UPDATE_FIELD_VALUE');
            setCurrentPrompt(' Yeni Atanan Kişi ID: ');
          } else {
            addLine(' Hatalı seçim! (0-4 arasında bir seçim yapınız)', 'error');
          }
          break;
        }

        case 'UPDATE_FIELD_VALUE': {
          if (!updateTemp || !updateTemp.fieldToUpdate) {
            printMainMenu();
            return;
          }

          const field = updateTemp.fieldToUpdate;
          let updatedCard = { ...updateTemp.kart };

          if (field === 'baslik') {
            if (!trimmed) {
              addLine(' Başlık boş bırakılamaz!', 'error');
              return;
            }
            updatedCard.baslik = trimmed;
          } else if (field === 'icerik') {
            updatedCard.icerik = trimmed;
          } else if (field === 'buyukluk') {
            const val = parseInt(trimmed, 10);
            if (isNaN(val) || val < 1 || val > 5) {
              addLine(' Hatalı büyüklük girişi! 1 ile 5 arasında olmalıdır.', 'error');
              setUpdateTemp(null);
              printMainMenu();
              return;
            }
            updatedCard.buyukluk = val as BuyuklukEnum;
          } else if (field === 'atananKisiId') {
            const id = parseInt(trimmed, 10);
            if (isNaN(id) || !currentBoard.takimUyeleri[id]) {
              addLine(' Hatalı kişi ID! Tanımlı bir takım üyesi bulunamadı.', 'error');
              setUpdateTemp(null);
              printMainMenu();
              return;
            }
            updatedCard.atananKisiId = id;
          }

          const line = updateTemp.line;
          const updatedBoard: BoardState = {
            ...currentBoard,
            lines: {
              ...currentBoard.lines,
              [line]: currentBoard.lines[line].map((k) => (k.id === updatedCard.id ? updatedCard : k)),
            },
          };

          setBoardState(updatedBoard);
          boardStateRef.current = updatedBoard;
          setUpdateTemp(null);

          addLine(` ✓ Kart başarıyla güncellendi! [${updatedCard.baslik}]`, 'success');
          printMainMenu();
          break;
        }

        default:
          printMainMenu();
          break;
      }
    },
    [
      currentPrompt,
      addTemp,
      moveTemp,
      updateTemp,
      addLine,
      addMultipleLines,
      printMainMenu,
      listBoard,
      listTeamMembers,
    ]
  );

  // Direct operations from UI (Kanban Board) that also sync and notify
  const directAddCard = useCallback((cardData: Omit<Kart, 'id' | 'olusturmaTarihi'>) => {
    const newCard: Kart = {
      ...cardData,
      id: `kart-${Date.now()}`,
      olusturmaTarihi: new Date().toLocaleString('tr-TR', { dateStyle: 'short', timeStyle: 'short' }),
    };

    setBoardState((prev) => {
      const next = {
        ...prev,
        lines: {
          ...prev.lines,
          [newCard.line]: [...prev.lines[newCard.line], newCard],
        },
      };
      boardStateRef.current = next;
      return next;
    });

    addLine(`[UI Senkronizasyon] Yeni kart eklendi: "${newCard.baslik}" -> ${newCard.line}`, 'system');
  }, [addLine]);

  const directMoveCard = useCallback((cardId: string, toLine: LineType) => {
    setBoardState((prev) => {
      let foundCard: Kart | null = null;
      let fromLine: LineType | null = null;

      const linesOrder: LineType[] = ['TODO', 'IN_PROGRESS', 'DONE'];
      for (const line of linesOrder) {
        const found = prev.lines[line].find((k) => k.id === cardId);
        if (found) {
          foundCard = found;
          fromLine = line;
          break;
        }
      }

      if (!foundCard || !fromLine || fromLine === toLine) return prev;

      const movedCard = { ...foundCard, line: toLine };

      const next = {
        ...prev,
        lines: {
          ...prev.lines,
          [fromLine]: prev.lines[fromLine].filter((k) => k.id !== cardId),
          [toLine]: [...prev.lines[toLine], movedCard],
        },
      };

      boardStateRef.current = next;
      addLine(`[UI Senkronizasyon] "${foundCard.baslik}" kartı ${fromLine} -> ${toLine} taşındı.`, 'system');
      return next;
    });
  }, [addLine]);

  const directDeleteCard = useCallback((cardId: string) => {
    setBoardState((prev) => {
      let deletedTitle = '';
      const newLines = {
        TODO: prev.lines.TODO.filter((k) => {
          if (k.id === cardId) { deletedTitle = k.baslik; return false; }
          return true;
        }),
        IN_PROGRESS: prev.lines.IN_PROGRESS.filter((k) => {
          if (k.id === cardId) { deletedTitle = k.baslik; return false; }
          return true;
        }),
        DONE: prev.lines.DONE.filter((k) => {
          if (k.id === cardId) { deletedTitle = k.baslik; return false; }
          return true;
        }),
      };

      const next = { ...prev, lines: newLines };
      boardStateRef.current = next;
      addLine(`[UI Senkronizasyon] "${deletedTitle || cardId}" kartı silindi.`, 'system');
      return next;
    });
  }, [addLine]);

  const directUpdateCard = useCallback((updatedCard: Kart) => {
    setBoardState((prev) => {
      const nextLines = {
        TODO: prev.lines.TODO.map((k) => (k.id === updatedCard.id ? updatedCard : k)),
        IN_PROGRESS: prev.lines.IN_PROGRESS.map((k) => (k.id === updatedCard.id ? updatedCard : k)),
        DONE: prev.lines.DONE.map((k) => (k.id === updatedCard.id ? updatedCard : k)),
      };
      const next = { ...prev, lines: nextLines };
      boardStateRef.current = next;
      addLine(`[UI Senkronizasyon] "${updatedCard.baslik}" kartı güncellendi.`, 'system');
      return next;
    });
  }, [addLine]);

  const resetToDefault = useCallback(() => {
    const initial = getInitialBoardState();
    setBoardState(initial);
    boardStateRef.current = initial;
    setTerminalLines([]);
    setAddTemp({});
    setMoveTemp(null);
    setUpdateTemp(null);
    const welcome = [
      { text: '=============================================================', type: 'system' as const },
      { text: '  C# Console ToDo Uygulaması [Varsayılan Duruma Sıfırlandı]', type: 'header' as const },
      { text: '  Geliştirici & Mimar: ENES ÖZTÜRK', type: 'header' as const },
      { text: '  3 Kolonlu Kanban Mimarisi: [TODO] - [IN PROGRESS] - [DONE]', type: 'system' as const },
      { text: '=============================================================', type: 'system' as const },
    ];
    addMultipleLines(welcome);
    printMainMenu();
  }, [addMultipleLines, printMainMenu]);

  return {
    boardState,
    terminalLines,
    currentStep,
    currentPrompt,
    inputValue,
    setInputValue,
    commandHistory,
    historyIndex,
    setHistoryIndex,
    handleCommand,
    directAddCard,
    directMoveCard,
    directDeleteCard,
    directUpdateCard,
    resetToDefault,
    listBoard,
    listTeamMembers,
    clearScreen: () => {
      setTerminalLines([]);
      printMainMenu();
    },
  };
}
